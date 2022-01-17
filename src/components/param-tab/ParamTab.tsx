import { observer } from "mobx-react";
import React, { useState } from "react";
import nextId from "react-id-generator";

import { intStringParamStore } from "../../store/IntStringParamStore";
import { enumStore } from "../../store/EnumStore";

import ParamItem from "./ParamItem";
import EnumItem from "./EnumItem";
import InputForEnum from "./InputForEnum";
import InputForIntString from "./InputForIntString";

import "./param-tab.css";
import { Col, Container, Row } from "react-bootstrap";

interface NewParam {
  newParamId: string;
  name: string;
  type: string;
  enumVariants?: string[];
  minValue?: number;
  maxValue?: number;
}

const ParamTab = observer(() => {
  const [newParam, setNewParam] = useState({} as NewParam);
  const { params } = intStringParamStore;
  const { enums } = enumStore;

  const havingStringAndIntParams = params.map((param) => {
    return <ParamItem key={param.paramId} {...param} />;
  });
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
    const newEnumVariants = newParam.enumVariants;

    setNewParam({ ...newParam, enumVariants: newEnumVariants });
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
          <InputForIntString
            minValue={newParam.minValue}
            maxValue={newParam.maxValue}
            changeMinOrMaxValueOfParam={onChangeMinOrMaxValueOfParam}
          />
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
    setNewParam({
      newParamId: newParam.newParamId,
      type: event.target.value,
      name: newParam.name,
    });
  };

  return (
    <div className="ParamTabContainer">
      <Container>
        <Row>
          <Col>
            <div>{havingStringAndIntParams}</div>
          </Col>
          <Col>
            <div>{havingEnumParams}</div>
          </Col>
        </Row>
      </Container>
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
  );
});

export default ParamTab;
