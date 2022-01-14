import React from "react";
import ParameterFormStore from "../../store/ParameterFormStore";
import { observer } from "mobx-react";
import Parameter from "../parameter/Parameter";
import "./styles.css";

import nextId from 'react-id-generator';

interface ParameterFormProps {}

interface ParameterFormState {
  defaultParamState: string;
  parametersValues?: JSX.Element;
  params: JSX.Element[];
}

@observer
export default class ParameterForm extends React.Component<
  ParameterFormProps,
  ParameterFormState
> {
  constructor(props: ParameterFormProps | Readonly<ParameterFormProps>) {
    super(props);
    this.state = {
      defaultParamState: "Not selected",
      parametersValues: <></>,
      params: [],
    };
    // this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd = (event) => {
    // >>> 1
    console.log(">>> 1");

    event.preventDefault();

    // let uid = Math.random().toString();
    let uid = nextId();
    // id которое будет у каждой строки параметра
    this.setState({
      /*Вот тут*/
      params: [...this.state.params, <Parameter id={uid} key={uid} />],
    });

    ParameterFormStore.addParameter(uid);
  };

  render() {
    return (
      <div>
        <div className="tab-pane fade active show">
          <p className="form-title">Tokens parameters</p>
          {this.state.params}
          <div className="flex-center">
            <button
              onClick={this.handleAdd}
              className="text btn btn-blue btn-block btn-sub"
            >
              + Add parameter
            </button>
          </div>
        </div>
      </div>
    );
  }
}
