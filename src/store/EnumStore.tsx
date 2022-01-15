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

  addEnum = (addingEnum: Enum) => {
    console.log("ENUMS IN ENUMSTORE: ", this.enums);
    this.enums.push(addingEnum);
  };

  deleteEnum = (idOfDeletingEnum: string) => {
    this.enums = this.enums.filter(
      (enumItem) => enumItem.enumId !== idOfDeletingEnum
    );
  };
}

export const enumStore = new EnumStore();
