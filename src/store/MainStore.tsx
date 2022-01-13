import { action, makeObservable, observable, reaction } from "mobx";
import RarityFormStore from "./RarityFormStore";
import commisionStore from "./CommisionStore";
import ParameterFormStore from "./ParameterFormStore";

import apiCall from "../api/CallApi";
import { global_urls } from "../config/urls";

class MainStore {
  collectionName: string = "";
  maxTokenNumber: number = 0;
  enums: any[] = [];
  commision = commisionStore;
  //main collection object
  Collection: any = {
    description: {
      name: this.collectionName,
      limit: this.maxTokenNumber,
      icon: "",
    },
    rarities: [],
    variables: [],
    enums: [],
    //"mediafiles": [],
    commissions: {
      // commissionAuthor: {
      //   check: false,
      //   value: 0,
      // },
      commissionFavorOwner: {
        check: false,
        value: 0,
      },
      // commissionAuthorGenerator: {
      //   check: false,
      //   value: 0,
      // },
      mintingPriceUsers: 0,
    },
    options: [],
  };

  constructor() {
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
        this.Collection.rarities = edited.map((x) => {
          x.limit = Number(x.limit);
          return x;
        });
      }
    );
    reaction(
      () => ParameterFormStore.parameters,
      () => {
        // TODO: make more readable and clear
        let paramCopy = JSON.parse(
          JSON.stringify(ParameterFormStore.parameters)
        );
        let editedParams = paramCopy.map((param) => {
          param = Object.assign(param, param.value_temporary);
          delete param.value_temporary;
          delete param.id;
          return param;
        });
        this.Collection.enums = [];

        // TODO: make more readable and clear
        this.Collection.variables = editedParams.map((param) => {
          switch (param.type) {
            case "enum":
              param.enumVariants = Object.values(param.enumVariants);
              this.Collection.enums.push(param);
              return param;
            case "uint":
              param.minValue = Number(param.minValue);
              param.maxValue = Number(param.maxValue);
              return param;
            case "string":
              param.minValue = Number(param.minValue);
              param.maxValue = Number(param.maxValue);
              return param;
          }
        });

        // TODO: make more readable and clear
        this.Collection.variables = this.Collection.variables.filter(
          (param) => param.type !== "enum"
        );
        this.Collection.enums = this.Collection.enums.map((enumItem) => ({
          ...enumItem,
          type: `e${enumItem.name}`,
        }));
      }
    );

    // Reactions for commisions
    reaction(
      () => this.commision.mintingPriceUsers,
      (mintingPriceUsers) => {
        this.Collection.commissions.mintingPriceUsers = mintingPriceUsers;
      }
    );

    reaction(
      () => this.commision.commissionFavorOwner.check,
      (commissionFavorOwnerCheck) => {
        this.Collection.commissions.commissionFavorOwner.check =
          commissionFavorOwnerCheck;
      }
    );

    reaction(
      () => this.commision.commissionFavorOwner.value,
      (commissionFavorOwnerValue) => {
        this.Collection.commissions.commissionFavorOwner.value =
          commissionFavorOwnerValue;
      }
    );

    makeObservable(this, {
      collectionName: observable,
      maxTokenNumber: observable,
      Collection: observable,
      enums: observable,
      commision: observable,
      changeCollectionName: action,
      changeMaxTokenNumber: action,
    });
  }

  changeCollectionName = (event: any) => {
    this.collectionName = event.target.value;
    this.Collection.description.name = this.collectionName;
  };

  changeMaxTokenNumber = (event: any) => {
    this.maxTokenNumber = Number(event.target.value);
    this.Collection.description.limit = this.maxTokenNumber;
  };

  sendingDataDeploy = async () => {
    const resData = await apiCall.post(
      global_urls.DEPLOY_COLLECTION,
      this.Collection
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
      body: JSON.stringify(this.Collection),
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
      body: JSON.stringify(this.Collection),
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

  clearData = () => {
    console.log("CLEAR DATA!!!!");

    this.Collection = {
      description: {
        name: "",
        limit: "",
        icon: "",
      },
      rarities: [],
      variables: [],
      enums: [],
      //"mediafiles": [],
      commissions: {
        // commissionAuthor: {
        //   check: false,
        //   value: 0,
        // },
        commissionFavorOwner: {
          check: false,
          value: 0,
        },
        // commissionAuthorGenerator: {
        //   check: false,
        //   value: 0,
        // },
        mintingPriceUsers: 0,
      },
      options: [],
    };
  };
}

export const store = new MainStore();
