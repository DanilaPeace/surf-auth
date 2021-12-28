
import { action, makeObservable, observable, reaction } from "mobx";
import { observer } from 'mobx-react';
import RarityFormStore from './RarityFormStore'
import commisionStore from './CommisionStore';
import ParameterFormStore from './ParameterFormStore'

class MainStore {
    collectionName: string = '';
    maxTokenNumber: number = 0;
    enums: any[] = [];
    commistions = commisionStore;
    //main collection object
    Collection: any = {
        "description": {
            "name": this.collectionName,
            "limit": this.maxTokenNumber,
            "icon": ''
        },
        "rarities": [],
        "variables": [],
        "enums": [],
        "mediafiles": [],
        "commissions": {
            "commissionAuthor": {
                "check": false,
                "value": 0
            },
            "commissionFavorOwner": {
                "check": true,
                "value": 0
            },
            "commissionAuthorGenerator": {
                "check": false,
                "value": 0
            },
            "mintingPriceUsers": 0
        }
    };
    constructor() {
        reaction(
            () => RarityFormStore.raritys,
            value => {
                let ed = JSON.parse(JSON.stringify(RarityFormStore.raritys));
                let edited = ed.map(x => {
                    x = Object.assign(x, x.value_temporary)
                    delete x.value_temporary;
                    delete x.id;
                    return x;
                })
                this.Collection.rarities = edited.map(x => {
                    if (x != ""){
                        return x;
                    }
                   
                }
                )
            }
        )
        reaction(
            () => ParameterFormStore.parameters,
            value => {
                let ed = JSON.parse(JSON.stringify(ParameterFormStore.parameters));
                let edited = ed.map(x => {
                    x = Object.assign(x, x.value_temporary)
                    delete x.value_temporary;
                    delete x.id;
                    return x;
                })
                this.Collection.enums = []
                this.Collection.mediafiles = []
                this.Collection.variables = edited.map(x => {
                    if (x.type == 'enum') {
                        x.enumVariants = Object.values(x.enumVariants)
                        this.Collection.enums.push(x)
                        return x;
                    }
                    else {
                        if (x.type == 'Mediafile') {
                            x.type = "string"
                            this.Collection.mediafiles.push(x)
                            return x;
                        }
                        else {
                            return x;
                        }
                        return x;
                    }
                })

                this.Collection.variables = this.Collection.variables.filter(item => item.type !== 'enum')
                this.Collection.variables = this.Collection.variables.filter(item => item.type !== 'Mediafile')

            }
        )

        makeObservable(this, {
            collectionName: observable,
            maxTokenNumber: observable,
            Collection: observable,
            enums: observable,
            commistions: observable,
            changeCollectionName: action,
            changeMaxTokenNumber: action
        })
    }

    changeCollectionName = (event: any) => {
        this.collectionName = event.target.value;
        this.Collection.description.name = this.collectionName;
    };

    changeMaxTokenNumber = (event: any) => {
        this.maxTokenNumber = event.target.value;
        this.Collection.description.limit = this.maxTokenNumber
    }
};

export const store = new MainStore();