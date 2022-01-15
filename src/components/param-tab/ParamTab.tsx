import { observer } from "mobx-react";
import React, { useState } from "react";

import "./param-tab.css";
import { paramStore } from "../../store/ParamStore";
import InputForEnum from "./InputForEnum";

interface NewParam {
  name: string;
  type: string;
  enumVariants?: string[];
  minValue?: number;
  maxValue?: number;
}

const ParamItem = ({ name, type, paramId, ...possibleValues }) => {
  console.log(`VALUES for ${name}: `, possibleValues);

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
    console.log(event);
    setNewParam({ ...newParam, [event.target.name]: event.target.value });
  };

  const addEnumVariant = (enumVariant: string) => {
    console.log("log: ", enumVariant);

    // newParam.enumVariants?.push(enumVariant);
    newParam.enumVariants?.push(enumVariant);
    console.log(newParam.enumVariants);
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
        newParam.enumVariants = [];
        return (
          <InputForEnum
            enumVariants={newParam.enumVariants}
            addEnumVariant={addEnumVariant}
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
    const { name, type, ...possibleValue } = newParam;
    paramStore.addParam(name, type, possibleValue);
    setNewParam({ name: "", type: "" });
  };

  const onParamNameChange = (event) => {
    setNewParam({ ...newParam, name: event.target.value });
  };

  const onParamTypeSelect = (event) => {
    setNewParam({ ...newParam, type: event.target.value });
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
