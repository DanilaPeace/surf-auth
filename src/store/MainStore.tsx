import { action, makeObservable, observable, reaction } from "mobx";

import commisionStore from "./CommisionStore";
import { enumStore } from "./EnumStore";
import { intStringParamStore } from "./IntStringParamStore";
import RarityFormStore from "./RarityFormStore";
import {
  Rarity,
  MintDesc,
  MintEnum,
  MintParam,
} from "../types/create-collection-types";
import apiCall from "../api/CallApi";
import { global_urls } from "../config/urls";

class MainStore {
  description: MintDesc = {
    name: "",
    limit: 0,
    icon: "",
  };
  // TODO: change the name of raritys
  rarities: Rarity[] = RarityFormStore.raritys;

  variables: MintParam[] = [];
  enums: MintEnum[] = [];
  commisions = commisionStore;
  options: [] = [];

  constructor() {
    makeObservable(this, {
      commisions: observable,
      changeCollectionName: action,
      changeMaxTokenNumber: action,
      description: observable,
      rarities: observable,
      enums: observable,
      changeEnums: action,
      variables: observable,
      changeVariables: action,
    });

    reaction(
      () => RarityFormStore.raritys,
      () => {
        let ed = JSON.parse(JSON.stringify(RarityFormStore.raritys));
        let edited = ed.map((x) => {
          x = Object.assign(x, x.value_temporary);
          delete x.value_temporary;
          delete x.id;
          return x;
        });
        this.rarities = edited.map((x) => {
          x.limit = Number(x.limit);
          return x;
        });
      }
    );

    // For Params
    reaction(() => intStringParamStore.params, this.changeVariables);

    // For enums
    reaction(() => enumStore.enums, this.changeEnums);

    // Reactions for commisions
    // TODO: change the reactions for commisitons
    reaction(
      () => this.commisions.mintingPriceUsers,
      (mintingPriceUsers) => {
        this.commisions.mintingPriceUsers = mintingPriceUsers;
      }
    );

    reaction(
      () => this.commisions.commissionFavorOwner.check,
      (commissionFavorOwnerCheck) => {
        this.commisions.commissionFavorOwner.check = commissionFavorOwnerCheck;
      }
    );

    reaction(
      () => this.commisions.commissionFavorOwner.value,
      (commissionFavorOwnerValue) => {
        this.commisions.commissionFavorOwner.value = commissionFavorOwnerValue;
      }
    );
  }

  changeEnums = () => {
    this.enums = enumStore.enums.map(({ name, enumVariants }) => {
      return {
        name,
        type: "e" + name,
        enumVariants,
      };
    });
  };

  changeVariables = () => {
    this.variables = intStringParamStore.params.map(
      ({ name, type, minValue, maxValue }) => {
        return { name, type, minValue: +minValue, maxValue: +maxValue };
      }
    );
  };

  changeCollectionName = (event: any) => {
    this.description.name = event.target.value;
  };

  changeMaxTokenNumber = (event: any) => {
    this.description.limit = Number(event.target.value);
  };

  sendingDataDeploy = async () => {
    const resData = await apiCall.post(
      global_urls.DEPLOY_COLLECTION,
      this.getSendedObject()
    );
    this.clearData();
    return resData;
  };

  sendingDataSave = () => {
    fetch(global_urls.SAVE_COLLECTION_DATA, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.getSendedObject()),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error !!!:", error);
      });
    this.clearData();
  };

  sendingDataContract = () => {
    fetch(global_urls.GENERATE_COLLECTION, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.getSendedObject()),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error !!!:", error);
      });

    this.clearData();
  };

  getSendedObject = () => ({
    description: this.description,
    rarities: this.rarities,
    variables: this.variables,
    enums: this.enums,
    commissions: this.commisions,
    options: this.options,
  });

  clearData = () => {
    this.description = {} as MintDesc;
    this.rarities = [];
    this.enums = [];
    this.variables = [];
    // TODO: make reset commisions and
    this.options = [];
  };
}

export const store = new MainStore();
