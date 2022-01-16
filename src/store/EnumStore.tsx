import { action, makeObservable, observable } from "mobx";

interface Enum {
  enumId: string;
  name: string;
  type: string;
  enumVariants: string[];
}

class EnumStore {
  enums: Enum[] = [];
  constructor() {
    makeObservable(this, {
      enums: observable,
      addEnum: action,
    });
  }

  addEnum = (enumId, name, type, enumVariants) => {
    const newEnum: Enum = {
      enumId,
      name,
      type,
      enumVariants,
    };
    this.enums.push(newEnum);
  };

  deleteEnum = (idOfDeletingEnum: string) => {
    this.enums = this.enums.filter(
      (enumItem) => enumItem.enumId !== idOfDeletingEnum
    );
  };
}

export const enumStore = new EnumStore();
