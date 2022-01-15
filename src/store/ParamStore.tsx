import { action, observable, makeObservable } from "mobx";

interface Parameter {
  paramId: string;
  name: string;
  type: string;
  enumVarians?: string[];
  minValue?: number;
  maxValue?: number;
}

class ParamStore {
  params: Parameter[] = [];
  constructor() {
    makeObservable(this, {
      params: observable,
      addParam: action,
      deleteParam: action,
    });
  }

  addParam = (paramId: string, name: string, type: string, possibleValue) => {
    if (type === "string" || type === "uint") {
      const newParam: Parameter = {
        paramId,
        name,
        type,
        minValue: possibleValue.minValue,
        maxValue: possibleValue.maxValue,
      };

      this.params.push(newParam);
    } else if (type === "enum") {
      const newParam: Parameter = {
        paramId,
        name,
        type,
        enumVarians: possibleValue,
      };

      this.params.push(newParam);

      console.log("ALL PARAM: ", this.params);
      console.log("NEW PARAM: ", newParam);
    }
  };

  deleteParam = (paramIdOfDeletedParam) => {
    this.params = this.params.filter(
      (param) => param.paramId !== paramIdOfDeletedParam
    );
  };
}

export const paramStore = new ParamStore();
