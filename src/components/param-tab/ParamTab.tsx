import { observer } from "mobx-react";
import React, { useState } from "react";
import styled from "styled-components";

import { paramStore } from "../../store/ParameterStore";

const ParamTabContainer = styled.div``;

const InputSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    margin-right: 30px;
    width: 30%;
  }
  select {
    border-radius: 50px;
    width: 30%;
    margin-right: 50px;
  }

  .btn {
    width: 20%;
  }
`;

const ParamItem = ({ name, type, paramId }) => {
  const onDeleteParam = (event) => {
    event.preventDefault();
    paramStore.deleteParam(paramId);
  };
  return (
    <div key={paramId}>
      <div>Name: {name}</div>
      <div>Type: {type}</div>
      <button className="btn btn-blue" onClick={onDeleteParam}>
        - DELETE PARAM
      </button>
    </div>
  );
};

interface NewParam {
  name: string;
  type: string;
  enumVarians?: string[];
  minValue?: number;
  maxValue?: number;
}

const ParamTab = observer(() => {
  const [newParam, setNewParam] = useState({} as NewParam);
  const { params } = paramStore;
  const havingParams = params.map((param) => {
    return <ParamItem {...param}></ParamItem>;
  });

  const onAddParam = (event) => {
    event.preventDefault();
    if (!newParam.type) {
      alert("Select the type!");
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
    <div className="ParamTab">
      <ParamTabContainer>
        <div className="HavingParams">{havingParams}</div>
        <InputSection>
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
          <button className="btn btn-blue" onClick={onAddParam}>
            ADD PARAM
          </button>
        </InputSection>
      </ParamTabContainer>
    </div>
  );
});

export default ParamTab;
