import { action, makeObservable, observable } from "mobx";

interface Rarity {
  id: string;
  name: string;
  limit: number;
  value_temporary?: RarityValue;
  [key: string]: any;
}

interface RarityValue {
  [key: string]: string;
}

class Store {
  raritys: Rarity[] = [];

  constructor() {
    makeObservable(this, {
      raritys: observable,
      changeRarity: action,
      addRarity: action,
      removeRarity: action,
    });
  }

  addRarity(rarId) {
    this.raritys = [
      ...this.raritys,
      { id: rarId, name: "", limit: 0, value_temporary: {} },
    ];
  }

  changeRarity(rarId, name, newparamvalue) {
    this.raritys = this.raritys.map((x) =>
      x.id === rarId ? { ...x, [name]: newparamvalue } : x
    );
  }

  changeRarityValue(rarId, name, newparamvalue) {
    this.raritys = this.raritys.map((x) =>
      x.id === rarId
        ? {
            ...x,
            value_temporary: { ...x.value_temporary, [name]: newparamvalue },
          }
        : x
    );
  }

  removeRarity(rarId) {
    this.raritys = this.raritys.filter((item) => item.id !== rarId);
  }
}

const RarityFormStore = new Store();
export default RarityFormStore;
