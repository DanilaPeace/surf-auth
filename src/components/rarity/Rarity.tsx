import React from "react";
import ParameterFormStore from "../../store/RarityFormStore";
import { observer } from "mobx-react";
import UserInput from "../common/user-input/UserInput";

import "./styles.css";

interface RarityProps {
  id: string;
}

interface RarityState {
  RarityValues?: JSX.Element;
}
@observer
export default class Rarity extends React.Component<RarityProps, RarityState> {
  constructor(props: RarityProps | Readonly<RarityProps>) {
    super(props);
    this.state = {
      RarityValues: <></>,
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.addRarity = this.addRarity.bind(this);
  }

  handleValueChange = (e) => {
    const { name, value } = e.target;
    ParameterFormStore.changeRarity(
      e.target.parentNode.parentNode.parentNode.id,
      name,
      value
    );
  };

  addRarity(state) {
    const { id } = this.props;
  }

  handleDelete(event) {
    event.preventDefault();
    ParameterFormStore.removeRarity(event.target.parentNode.parentNode.id);
    event.target.parentElement.parentElement.remove();
  }

  render() {
    const { id } = this.props;
    return (
      <div className="row parameter-choice" id={id}>
        <div className="col">
          <UserInput
            inputType="text"
            labelName="Rarity Type For Token"
            name="name"
            inputName="name"
            onChange={this.handleValueChange}
          />
        </div>
        <div className="col">
          <UserInput
            inputType="number"
            labelName="Maximum tokens number for type"
            name="limit"
            inputName="limit"
            onChange={this.handleValueChange}
          />
        </div>
        {this.state.RarityValues}
        <div className="flex-center">
          <button
            onClick={this.handleDelete}
            className="btn btn-blue btn-block"
          >
            - Delete rarity
          </button>
        </div>
      </div>
    );
  }
}
