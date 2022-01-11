import { observable, action, makeObservable } from "mobx";

class CommisionStore {
  constructor() {
    makeObservable(this, {
      commissionFavorOwner: observable,
      mintingPriceUsers: observable,
      onChangeCommissionFavorOwner: action,
      onChangeMintingPriceUsers: action,
      onChangeCheckbox: action,
    });
  }

  mintingPriceUsers: number = 0;
  commissionFavorOwner: { check: boolean; value: number } = {
    check: false,
    value: 0,
  };

  onChangeCheckbox = (value) => {
    this.commissionFavorOwner.check = value;
  };

  onChangeCommissionFavorOwner = (event: any) => {
    this.commissionFavorOwner.value = +event.currentTarget.value;
  };

  onChangeMintingPriceUsers = (event: any) => {
    this.mintingPriceUsers = +event.target.value;
  };
}

export default new CommisionStore();
