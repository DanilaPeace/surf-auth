
import { action, makeObservable, observable, reaction } from "mobx";
import { observer } from 'mobx-react';
import RarityFormStore from './RarityFormStore'
import commisionStore from './CommisionStore';
import ParameterFormStore from './ParameterFormStore'
import internal from "stream";

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
        //"mediafiles": [],
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
                    x.limit=Number(x.limit)
                    return x;
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
                //this.Collection.mediafiles = []
                this.Collection.variables = edited.map(x => {
                    switch (x.type) {
                        case "enum":
                            x.enumVariants = Object.values(x.enumVariants)
                            this.Collection.enums.push(x)
                            return x;
                        // case "Mediafile":
                        //     x.type = "string"
                        //     this.Collection.mediafiles.push(x)
                        //     return x;
                        case "uint":
                            x.minValue=Number(x.minValue)
                            x.maxValue=Number(x.maxValue)
                            return x;
                        case "string":
                            x.minValue=Number(x.minValue)
                            x.maxValue=Number(x.maxValue)
                            return x;
                    // if (x.type == 'enum') {
                    //     x.enumVariants = Object.values(x.enumVariants)
                    //     this.Collection.enums.push(x)
                    //     return x;
                    // }
                    // else {
                    //     if (x.type == 'Mediafile') {
                    //         x.type = "string"
                    //         this.Collection.mediafiles.push(x)
                    //         return x;
                    //     }
                    //     else  {
                    //         return x;
                    //     }
                        
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
        this.Collection.description.limit = Number(this.maxTokenNumber)
    }
    sendingData = () =>{
        fetch('http://localhost:4001/root-collection/deploy-collection', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.Collection),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error !!!:', error);
        });
    }
};

export const store = new MainStore();