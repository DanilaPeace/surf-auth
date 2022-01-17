import { action, observable, makeObservable } from "mobx";

import { IntAndStrParam } from "../types/create-collection-types";

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

    this.params = [...this.params, newParam];
  };

  deleteParam = (idOfDeletingParam) => {
    this.params = this.params.filter(
      (param) => param.paramId !== idOfDeletingParam
    );
  };
}

export const intStringParamStore = new IntStringParamStore();
