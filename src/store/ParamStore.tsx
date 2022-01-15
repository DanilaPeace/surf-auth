import { action, observable, makeObservable } from "mobx";
import nextId from "react-id-generator";

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

  addParam = (name: string, type: string, possibleValue) => {
    if (type === "string" || type === "uint") {
      const newParam: Parameter = {
        paramId: nextId(),
        name,
        type,
        minValue: possibleValue.minValue,
        maxValue: possibleValue.maxValue,
      };

      this.params.push(newParam);
    } else if (type === "enum") {
      const newParam: Parameter = {
        paramId: nextId(),
        name,
        type,
        enumVarians: possibleValue,
      };

      this.params.push(newParam);
    }
  };

  addEnumVariant = () => {

  }

  deleteParam = (paramIdOfDeletedParam) => {
    this.params = this.params.filter(
      (param) => param.paramId !== paramIdOfDeletedParam
    );
  };
}

export const paramStore = new ParamStore();
