import { observer } from "mobx-react";
import React, { useState } from "react";
import nextId from "react-id-generator";

import "./param-tab.css";
import { intStringParamStore } from "../../store/IntStringParamStore";
import { enumStore } from "../../store/EnumStore";
import InputForEnum from "./InputForEnum";

interface NewParam {
  newParamId: string;
  name: string;
  type: string;
  enumVariants?: string[];
  minValue?: number;
  maxValue?: number;
}

const ParamItem = ({ name, type, paramId, minValue, maxValue }) => {
  const onDeleteParam = (event) => {
    event.preventDefault();
    intStringParamStore.deleteParam(paramId);
  };

  return (
    <div key={paramId}>
      <div>ID: {paramId}</div>
      <div>Name: {name}</div>
      <div>Type: {type}</div>
      <div>MinValue: {minValue}</div>
      <div>MaxValue: {maxValue}</div>
      <button className="btn btn-blue" onClick={onDeleteParam}>
        - DELETE PARAM
      </button>
    </div>
  );
};

const EnumItem = ({ name, type, enumId, enumVariants }) => {
  const onDeleteParam = (event) => {
    event.preventDefault();
    enumStore.deleteEnum(enumId);
  };

  const possibleValues = enumVariants?.map((variant) => (
    <span key={nextId()}>{variant}, </span>
  ));

  return (
    <div>
      <div>ENUMID: {enumId}</div>
      <div>Name: {name}</div>
      <div>Type: {type}</div>
      <div>Possible Values: {possibleValues}</div>
      <button className="btn btn-blue" onClick={onDeleteParam}>
        - DELETE PARAM
      </button>
    </div>
  );
};

const ParamTab = observer(() => {
  const [newParam, setNewParam] = useState({} as NewParam);
  const { params } = intStringParamStore;
  const { enums } = enumStore;
  const havingStringAndIntParams = params.map(
    (param) => {
      return (
        <ParamItem {...param}/>
      );
    }
  );

  const havingEnumParams = enums.map((enumItem) => {
    return <EnumItem key={enumItem.enumId} {...enumItem} />;
  });

  const onChangeMinOrMaxValueOfParam = (event) => {
    setNewParam({ ...newParam, [event.target.name]: event.target.value });
  };

  const thereIsNotEnumVariants = () => !newParam.enumVariants;

  const addEnumVariant = (enumVariant: string) => {
    if (thereIsNotEnumVariants()) {
      // To add enum variant in the first time
      newParam.enumVariants = [];
    }
    newParam.enumVariants?.push(enumVariant);
    const newEnumVariant = newParam.enumVariants;

    setNewParam({ ...newParam, enumVariants: newEnumVariant });
  };

  const deleteEnumVariant = (deletedEnumVariant: string) => {
    const newEnumVariants = newParam.enumVariants?.filter(
      (enumVariantName) => enumVariantName !== deletedEnumVariant
    );

    setNewParam({ ...newParam, enumVariants: newEnumVariants });
  };

  const getPossibleValuesOfParam = () => {
    switch (newParam.type) {
      case "string":
      case "uint": {
        return (
          <div>
            <input
              className="form-control user-input"
              type="number"
              name="minValue"
              placeholder="Type the min value param here"
              value={newParam.minValue || ""}
              onChange={onChangeMinOrMaxValueOfParam}
            />
            <input
              className="form-control user-input"
              type="text"
              name="maxValue"
              placeholder="Type the min value param here"
              value={newParam.maxValue || ""}
              onChange={onChangeMinOrMaxValueOfParam}
            />
          </div>
        );
      }
      case "enum": {
        return (
          <InputForEnum
            enumVariants={newParam.enumVariants}
            addEnumVariant={addEnumVariant}
            deleteEnumVariant={deleteEnumVariant}
          />
        );
      }
      default:
        <></>;
    }
  };

  const possibleValuesOfParam = getPossibleValuesOfParam();

  const onAddParam = (event) => {
    event.preventDefault();

    if (!newParam.type || !newParam.name) {
      alert("Select the type or name!");
      return;
    }

    newParam.newParamId = nextId();
    const { newParamId, name, type } = newParam;
    if (newParam.type === "string" || newParam.type === "uint") {
      const { minValue, maxValue } = newParam;
      intStringParamStore.addParam(
        newParamId,
        name,
        type,
        minValue as number,
        maxValue as number
      );
    } else if (newParam.type === "enum") {
      const { enumVariants } = newParam;
      enumStore.addEnum(newParamId, name, type, enumVariants);
    }

    setNewParam({ newParamId: "", name: "", type: "" });
  };

  const onParamNameChange = (event) => {
    setNewParam({ ...newParam, name: event.target.value });
  };

  const onParamTypeSelect = (event) => {
    const oldParamId = newParam.newParamId;
    const oldParamName = newParam.name;
    setNewParam({
      type: event.target.value,
      newParamId: oldParamId,
      name: oldParamName,
    });
  };

  return (
    <>
      <div className="ParamTabContainer">
        <div className="HavingParams">{havingStringAndIntParams}</div>
        <div className="HavingParams">{havingEnumParams}</div>
        <div className="ParamDescription">
          <div className="ParamDescriptionContainer">
            <div className="NameTypeContainer">
              <input
                className="form-control user-input"
                type="text"
                placeholder="Type the param name here"
                value={newParam.name || ""}
                onChange={onParamNameChange}
              />
              <select
                name="param-select"
                className="form-select"
                defaultValue="Not Selected"
                value={newParam.type}
                onChange={onParamTypeSelect}
              >
                <option>No Selectred</option>
                <option value="string">String</option>
                <option value="uint">Integer</option>
                <option value="enum">Enumeration</option>
              </select>
            </div>
            {possibleValuesOfParam}
          </div>

          <button className="btn btn-blue" onClick={onAddParam}>
            ADD PARAM
          </button>
        </div>
      </div>
    </>
  );
});

export default ParamTab;
