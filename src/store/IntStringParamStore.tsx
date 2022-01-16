import { action, observable, makeObservable } from "mobx";

interface IntAndStrParam {
  paramId: string;
  name: string;
  type: string;
  minValue: number;
  maxValue: number;
}

class IntStringParamStore {
  params: IntAndStrParam[] = [];

  constructor() {
    makeObservable(this, {
      params: observable,
      addParam: action,
      deleteParam: action,
    });
  }

  addParam = (
    paramId: string,
    name: string,
    type: string,
    minValue: number,
    maxValue: number
  ) => {
    const newParam: IntAndStrParam = {
      paramId,
      name,
      type,
      minValue,
      maxValue,
    };

    this.params.push(newParam);
  };

  deleteParam = (idOfDeletingParam) => {
    this.params = this.params.filter(
      (param) => param.paramId !== idOfDeletingParam
    );
  };
}

export const intStringParamStore = new IntStringParamStore();
