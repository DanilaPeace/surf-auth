import { makeObservable, observable } from "mobx";

interface CollectionDescription {
  name: string;
  limit: number;
  icon: string;
}

interface Rarity {
  name: string;
  limit: number;
}

interface Parameter {
  paramId: string;
  name: string;
  type: string;
  minValue: number;
  maxValue: number;
}

interface Enum {
  name: string;
  type: string;
  enumVariants: string[];
}

class CreateCollectionStore {
  description: CollectionDescription = {} as CollectionDescription;
  rarities: Rarity[] = [];
  variables: Parameter[] = [];
  enums: Enum[] = [];
  // TODO: add commistions and options

  constructor() {
    makeObservable(this, {
      description: observable,
      rarities: observable,
      variables: observable,
      enums: observable,
    });
  }

}

export const createCollectionStore = new CreateCollectionStore();
