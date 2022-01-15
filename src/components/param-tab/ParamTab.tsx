import { observer } from "mobx-react";
import React, { useState } from "react";
import nextId from "react-id-generator";

import "./param-tab.css";
import { paramStore } from "../../store/ParamStore";
import InputForEnum from "./InputForEnum";

interface NewParam {
  newParamId: string;
  name: string;
  type: string;
  enumVariants?: string[];
  minValue?: number;
  maxValue?: number;
}

const ParamItem = ({ name, type, paramId, ...possibleValues }) => {
  const onDeleteParam = (event) => {
    event.preventDefault();
    paramStore.deleteParam(paramId);
  };

  return (
    <div key={paramId}>
      <div>Name: {name}</div>
      <div>Type: {type}</div>
      <div></div>
      <button className="btn btn-blue" onClick={onDeleteParam}>
        - DELETE PARAM
      </button>
    </div>
  );
};

const ParamTab = observer(() => {
  const [newParam, setNewParam] = useState({} as NewParam);
  const { params } = paramStore;
  const havingParams = params.map((param) => {
    return <ParamItem {...param}></ParamItem>;
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
        console.log("INNER");

        // newParam.enumVariants = [];
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
    setNewParam({ ...newParam, newParamId: nextId() });
    const { newParamId, name, type, ...possibleValue } = newParam;
    paramStore.addParam(newParamId, name, type, possibleValue);
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
        <div className="HavingParams">{havingParams}</div>
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
