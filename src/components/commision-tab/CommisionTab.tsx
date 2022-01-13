import { useState } from "react";
import UserInput from "../common/user-input/UserInput";
import "./commision-tab.css";

import { store } from "../../store/MainStore";
import { observer } from "mobx-react";

const CommisionTab = observer(() => {
  const [checked, setChecked] = useState(false);

  const onChangeCheckbox = () => {
    setChecked(!checked);

    store.commision.onChangeCheckbox(!checked);
  };

  return (
    <div className="commitsion-tab text">
      <div className="commision-tab__content">
        <div className="commision-checkbox mb-3">
          
          <div className="commision-checkbox">
            <input type="checkbox" onChange={onChangeCheckbox} className="form-check-input" />
            <label className="labelCheckboxCommision">Commision to collection owner</label>
          </div>
          <div className={"commsion-input " + (checked ? "active" : "")}>
            <UserInput
              inputType="text"
              labelName="Commision (%)"
              inputName="Type commision here"
              data={store.commision.commissionFavorOwner.value}
              onChange={store.commision.onChangeCommissionFavorOwner}
            />
          </div>
        </div>
        <UserInput
          inputType="text"
          labelName="Minting price for users (EVERs)"
          inputName="Type price"
          data={store.commision.mintingPriceUsers}
          onChange={store.commision.onChangeMintingPriceUsers}
        />
      </div>
    </div>
  );
});

export default CommisionTab;
