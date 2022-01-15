import { action, observable, makeObservable } from "mobx";

import { enumStore } from "./EnumStore";

interface Parameter {
  paramId: string;
  name: string;
  type: string;
  enumVariants?: string[];
  minValue?: number;
  maxValue?: number;
}

interface Enum {
  enumId: string;
  name: string;
  type: string;
  enumVariants: string[];
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

  addParam = (
    paramId: string,
    name: string,
    type: string,
    possibleValue: any
  ) => {
    if (type === "string" || type === "uint") {
      const newParam: Parameter = {
        paramId,
        name,
        type,
        minValue: possibleValue.minValue,
        maxValue: possibleValue.maxValue,
      };
      
      console.log("Param: ", newParam);
      this.params.push(newParam);
    } else if (type === "enum") {
      const newEnum: Enum = {
        enumId: paramId,
        name,
        type,
        enumVariants: possibleValue.enumVariants,
      };
      console.log("NUUUUUUMMMM: ", newEnum);

      //   this.params.push(newParam);
      enumStore.addEnum(newEnum);
      // TODO: addint the enum store
    }
  };

  deleteParam = (idOfDeletingParam) => {
    this.params = this.params.filter(
      (param) => param.paramId !== idOfDeletingParam
    );
  };
}

export const paramStore = new ParamStore();
