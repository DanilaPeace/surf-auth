import { action, makeObservable, observable } from "mobx";

type Rarity = {
    name: string,
    tokenAmount: number
};

class MainStore {
    collectionName: string = '';
    maxTokenNumber: number = 0;
    raritiesList: Rarity[] = [];

    constructor() {
        makeObservable(this, {
            collectionName: observable,
            maxTokenNumber: observable,
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