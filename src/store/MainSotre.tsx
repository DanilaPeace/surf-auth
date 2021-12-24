import { action, makeObservable, observable } from "mobx";

class MainStore {
    collectionName: string = '';
    maxTokenNumber: number = 0;

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
        console.log('name: ', this.collectionName);
    };
    
    changeMaxTokenNumber = (event: any) => {
        this.maxTokenNumber = event.target.value;
        console.log('num: ', this.maxTokenNumber);
    }
};

export const store = new MainStore(); 