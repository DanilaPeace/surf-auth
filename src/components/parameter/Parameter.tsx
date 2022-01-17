import React from "react";
import ParameterFormStore from "../../store/ParameterFormStore";
import { observer } from "mobx-react";
import UserInput from "../common/user-input/UserInput";
import Select from "../common/select/select";
import EnumOptions from "../enumeration/Enum";
import "./styles.css";

interface ParamProps {
  id: string;
}

interface ParamState {
  defaultParamState: string;
  parametersValues?: JSX.Element;
}

@observer
export default class Parameter extends React.Component<ParamProps, ParamState> {
  constructor(props: ParamProps | Readonly<ParamProps>) {
    super(props);
    this.state = {
      defaultParamState: "Not selected",
      parametersValues: <></>,
    };
  }

  onChangeNameOfParam = (e) => {
    const { name, value } = e.target;

    // When to change the parameter name
    console.log(`>>> 3 NAME: ${name} VALUE: ${value}`);
    console.log(">>> 3", e.target);

    ParameterFormStore.changeParameter(
      // Это айди параметра, в котором происходят изменения
      e.target.parentNode.parentNode.parentNode.id,
      name,
      value
    );
  };

  onChangeMinMaxValue = (e) => {
    // When we change the min or max value of param
    console.log(">>> 8");

    const { name, value } = e.currentTarget;
    ParameterFormStore.changeParameterValue(
      e.target.parentNode.parentNode.parentNode.id,
      name,
      value
    );
  };

  handleCheckBoxValueChange = (e) => {
    let id = e.target.parentNode.parentNode.id;
    ParameterFormStore.changeParameter(id, e.target.name, e.target.checked);
  };

  addParameter = (paramType) => {
    // Этот метод вызвается, когда изменяется тип параметра в селекте
    console.log(">>> 6");
    console.log(">>> 6", this.props);

    const { id } = this.props;
    switch (paramType) {
      case "Integer":
        let rangeForInt = { minValue: "", maxValue: "" };
        let type = "uint";

        //!!! Эта функция изменяет значение параметра в ParameterFormStore
        ParameterFormStore.switchParamType(id, type, rangeForInt);
        return (
          <div id={id} className="row parameter-choice">
            <div className="col">
              <UserInput
                inputType="number"
                labelName="Minumum value"
                name="minValue"
                inputName="minValue"
                onChange={this.onChangeMinMaxValue}
              />
            </div>
            <div className="col">
              <UserInput
                inputType="number"
                labelName="Maximum value"
                name="maxValue"
                inputName="maxValue"
                onChange={this.onChangeMinMaxValue}
              />
            </div>
          </div>
        );
      case "String":
        let rangeForString = { minValue: "", maxValue: "" };
        let type1 = "string";
        //!!! Эта функция изменяет значение параметра в ParameterFormStore
        ParameterFormStore.switchParamType(id, type1, rangeForString);
        return (
          <div id={id} className="row parameter-choice">
            <div className="col">
              <UserInput
                inputType="number"
                labelName="Minimum length"
                name="minValue"
                inputName="minValue"
                onChange={this.onChangeMinMaxValue}
              />
            </div>
            <div className="col">
              <UserInput
                inputType="number"
                labelName="Maximum length"
                name="maxValue"
                inputName="maxValue"
                onChange={this.onChangeMinMaxValue}
              />
            </div>
          </div>
        );
      case "Enumeration":
        let val2 = { enumVariants: {} };
        let type2 = "enum";
        //!!! Эта функция изменяет значение параметра в ParameterFormStore
        ParameterFormStore.switchParamType(id, type2, val2);
        return (
          <div id={id}>
            <EnumOptions id={id} />
          </div>
        );
      // case 'Mediafile':
      //     let val3 = {};
      //     let type3 = 'Mediafile';
      //     ParameterFormStore.switchParamType(id, type3, val3)
      //     return (
      //         <div id={id}>
      //         </div>
      //     );
      //     break;
      case "Not selected":
        let val4 = {};
        let type4 = "";
        ParameterFormStore.switchParamType(id, type4, val4);
        return <div></div>;
    }
  };

  onParamTypeChange = (event) => {
    // When user change parameter type
    console.log(">>> 5");
    console.log(">>> 5 TARGET: ", event.target);
    console.log(">>> 5 VALUE: ", event.target.value);

    event.preventDefault();

    // ????????????????????????????????????????????
    this.setState(
      {
        defaultParamState: event.target.value,
      },
      () =>
        this.setState({
          parametersValues: this.addParameter(this.state.defaultParamState),
        })
    );
    // ????????????????????????????????????????????
  };

  handleDelete = (event) => {
    event.preventDefault();
    ParameterFormStore.removeParameter(event.target.parentNode.parentNode.id);
    event.target.parentElement.parentElement.remove();
  };

  render() {
    const { id } = this.props;
    return (
      <div className="row parameter-choice" id={id}>
        <div className="col">
          <UserInput
            inputType="text"
            labelName="Parameter name"
            inputName="name"
            onChange={this.onChangeNameOfParam}
          />
        </div>
        <div className="col">
          <Select
            selectOptions={["Not selected", "String", "Integer", "Enumeration"]} //, 'Mediafile'
            name="select"
            onChange={this.onParamTypeChange}
            value={this.state.defaultParamState}
            className="form-select select-list"
            labelName="Parameter type"
          />
        </div>
        {this.state.parametersValues}
        <div className="flex-center">
          <button
            onClick={this.handleDelete}
            className="text btn btn-blue btn-block btn-sub"
          >
            - Delete parameter
          </button>
        </div>
      </div>
    );
  }
}
