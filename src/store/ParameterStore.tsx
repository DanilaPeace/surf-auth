import { action, observable, makeObservable } from "mobx";

interface Parameter {
  paramId: number;
  name: string;
  type: string;
  enumVarians?: string[];
  minValue?: number;
  maxValue?: number;
}

class ParameterStore {
    params: Parameter[] = [];
    constructor() {
        makeObservable(this, {
            params: observable,
            addParam: action,
            deleteParam: action
        })
    }

    addParam = () => {

    }

    deleteParam = () => {
        
    }
}
