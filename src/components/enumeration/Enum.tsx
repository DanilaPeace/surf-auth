import React from "react";
import nextId from "react-id-generator";

import ParameterFormStore from "../../store/ParameterFormStore";
import UserInput from "../common/user-input/UserInput";
import "./styles.css";

interface EnumOptionsState {
  enumVariants: EnumType[];
  rendered: JSX.Element[];
}

interface EnumType {
  id: string;
  value: any;
}

interface EnumOptionsProps {
  id?: string;
}

export default class EnumOptions extends React.Component<
  EnumOptionsProps,
  EnumOptionsState
> {
  constructor(props: EnumOptionsProps | Readonly<EnumOptionsProps>) {
    super(props);
    this.state = {
      enumVariants: [],
      rendered: [],
    };
  }

  onAddVariant = (e) => {
    e.preventDefault();

    let enumId = nextId();

    const { id } = this.props;

    // Finish
    ParameterFormStore.addEnumVariant(id, enumId, {});

    this.setState({
      rendered: [
        ...this.state.rendered,
        <div>
          <UserInput
            inputType="text"
            labelName="Variant:"
            name="enumoption"
            inputName="enumoption"
            key={enumId}
            onChange={(e) => this.handleChange(id, enumId, e)}
          />
          <div className="flex-center">
            <button
              className="text btn btn-blue btn-block btn-sub"
              onClick={(e) => this.handleDelete(id, enumId, e)}
            >
              - Delete variant
            </button>
          </div>
        </div>,
      ],
    });
  };

  handleChange = (id, enumId, e) => {
    ParameterFormStore.addEnumVariant(id, enumId, e.target.value);
  };

  handleDelete = (id, enumId, event) => {
    event.preventDefault();
    ParameterFormStore.removeEnum(id, enumId);

    event.target.parentElement.parentElement.remove();
  };

  handleCheckBoxValueChange = (e) => {
    let id = this.props.id;
    ParameterFormStore.changeParameter(id, e.target.name, e.target.checked);
  };

  render() {
    return (
      <div>
        {this.state.rendered}
        <div className="flex-center">
          <button
            onClick={this.onAddVariant}
            className="text btn btn-blue btn-block btn-sub"
          >
            + Add variant
          </button>
        </div>
      </div>
    );
  }
}
