import React from "react";
import RarityFormStore from "../../store/RarityFormStore";
import { store } from "../../store/MainStore";
import { observer } from "mobx-react";
import Rarity from "../rarity/Rarity";
import "./styles.css";

interface RarityFormProps {}

interface RarityFormState {
  raritys: JSX.Element[];
  checked: boolean;
}

@observer
export default class RarityForm extends React.Component<
  RarityFormProps,
  RarityFormState
> {
  constructor(props: RarityFormProps | Readonly<RarityFormProps>) {
    super(props);

    this.state = {
      raritys: [],
      checked: false,
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    let uid = Math.random().toString();
    this.setState({
      raritys: [...this.state.raritys, <Rarity id={uid} key={uid}/>],
    });
    RarityFormStore.addRarity(uid);
  }

  render() {
    return (
      <div>
        <div className="checkboxForRarity text">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => this.setState({ checked: !this.state.checked })}
          />
          <label className="labelCheckboxForRarity">Use Rarity Types for tokens</label>
        </div>

        {this.state.checked ? (
          <div className="tab-pane fade show active">
            {this.state.raritys}
            <div className="flex-center">
              <button
                onClick={this.handleAdd}
                className="btn btn-blue btn-block"
              >
                + Add rarity
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
