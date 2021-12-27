import { action, makeObservable, observable, reaction } from "mobx";
import ParameterFormStore from './ParameterFormStore'

type Rarity = {
    name: string,
    tokenAmount: number
};

class MainStore {
    collectionName: string = '';
    maxTokenNumber: number = 0;
    raritiesList: Rarity[] = [];
    enums: any[] = [];
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
            changeCollectionName: action,
            changeMaxTokenNumber: action
        })
    }

    changeCollectionName = (event: any) => {
        this.collectionName = event.target.value;
    };

    changeMaxTokenNumber = (event: any) => {
        this.maxTokenNumber = event.target.value;
    }
};

export const store = new MainStore();