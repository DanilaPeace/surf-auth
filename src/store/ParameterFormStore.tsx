import { action, makeObservable, observable } from "mobx";

interface Parameter {
    id: string;
    name: string;
    type: string;
    value_temporary?: ParamValue;
    [key: string]: any;
}

interface ParamValue {
    [key: string]: string | enumVariants;
}

interface enumVariants {
    [key: string]: string
}

class Store {
    parameters: Parameter[] = [];

    constructor() {
        makeObservable(this, {
            parameters: observable,
            changeParameter: action,
            addParameter: action,
            removeParameter: action,
            switchParameterTypeValues: action,
            removeEnum: action
        })
    }

    addParameter(paramId) {
        this.parameters = [...this.parameters, { id: paramId, name: '', type: '', value_temporary: {} }]
    }

    changeParameter(paramId, name, newparamvalue) {
        this.parameters = this.parameters.map(x => (x.id === paramId ? { ...x, [name]: newparamvalue } : x));
    }

    changeParameterValue(paramId, name, newparamvalue) {
        this.parameters = this.parameters.map(x => (x.id === paramId ? { ...x, value_temporary: { ...x.value_temporary, [name]: newparamvalue } } : x));
    }

    changeParameterValueEnum(paramId, name, newparamvalue) {
        this.parameters = this.parameters.map(x => (x.id === paramId ? { ...x, value_temporary: { ...x.value_temporary, enumVariants: { ...x.value_temporary!.enumVariants as {}, [name]: newparamvalue } } } : x));
    }

    switchParameterTypeValues(paramId, type, value) {
        this.parameters = this.parameters.map(x => (x.id === paramId ? { ...x, type: type, value_temporary: value } : x));
    }

    removeParameter(paramId) {
        this.parameters = this.parameters.filter(item => item.id !== paramId)
    }

    removeEnum(paramId, enumid) {
        const deleteObject = (arr, id) => {
            delete arr[id]
            return arr;
        }
        this.parameters = this.parameters.map(x => (x.id === paramId ? { ...x, value_temporary: { ...x.value_temporary, enumVariants: deleteObject(x.value_temporary!.enumVariants, enumid) } } : x));
    }
};

const ParameterFormStore = new Store();
export default ParameterFormStore;
