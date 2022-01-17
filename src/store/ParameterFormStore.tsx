import { action, makeObservable, observable } from "mobx";

interface Parameter {
  id: string;
  name: string;
  type: string;
  possibleValuesOfParam?: ParamValue;
  [key: string]: any;
}

interface ParamValue {
  [key: string]: string | enumVariants;
}

interface enumVariants {
  [key: string]: string;
}

class Store {
  parameters: Parameter[] = [];

  constructor() {
    makeObservable(this, {
      parameters: observable,
      changeParameter: action,
      addParameter: action,
      removeParameter: action,
      switchParamType: action,
      removeEnum: action,
    });
  }

  addParameter(paramId) {
    // >>> 2
    console.log(">>> 2");

    this.parameters = [
      ...this.parameters,
      { id: paramId, name: "", type: "", possibleValuesOfParam: {} },
    ];
  }

  changeParameter(paramId, name, newparamvalue) {
    // This function is invoked from Parameter.tsx
    this.parameters = this.parameters.map((x) =>
      x.id === paramId ? { ...x, [name]: newparamvalue } : x
    );
  }

  changeParameterValue(paramId, name, newParamValue) {
    // Эта функция вызывается только для строк и целых чисел
    console.log(">>> 9", paramId, name, newParamValue);

    this.parameters = this.parameters.map((param) =>
      param.id === paramId
        ? {
            ...param,
            possibleValuesOfParam: {
              ...param.possibleValuesOfParam,
              [name]: newParamValue,
            },
          }
        : param
    );
  }

  // Finish
  addEnumVariant(paramId, name, newParamValue) {
    this.parameters = this.parameters.map((enumItem) =>
      enumItem.id === paramId
        ? {
            ...enumItem,
            possibleValuesOfParam: {
              // ...enumItem.possibleValuesOfParam,
              enumVariants: {
                ...(enumItem.possibleValuesOfParam!.enumVariants as {}),
                [name]: newParamValue,
              },
            },
          }
        : enumItem
    );
  }

  switchParamType(paramId, type, value) {
    // Вызывается для всех типов параметров
    console.log(">>> 7 This function is invoked for every params!!!", value);

    // Изменяет значение параметра когда тыкаем в селекте
    this.parameters = this.parameters.map((x) =>
      // Находим параметр по айдишнику и потом меняем у него тип и диапозон значений
      x.id === paramId ? { ...x, type: type, possibleValuesOfParam: value } : x
    );
  }

  removeParameter(paramId) {
    // Удаление параметра
    this.parameters = this.parameters.filter((item) => item.id !== paramId);
  }

  removeEnum(paramId, enumid) {
    const deleteObject = (arr, id) => {
      delete arr[id];
      return arr;
    };
    this.parameters = this.parameters.map((x) =>
      x.id === paramId
        ? {
            ...x,
            possibleValuesOfParam: {
              ...x.possibleValuesOfParam,
              enumVariants: deleteObject(
                x.possibleValuesOfParam!.enumVariants,
                enumid
              ),
            },
          }
        : x
    );
  }
}

const ParameterFormStore = new Store();
export default ParameterFormStore;
