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
    <div className="commitsion-tab">
      <div className="commision-tab__content">
        <div className="commision-checkbox mb-3">
          <label>
            <input type="checkbox" onChange={onChangeCheckbox} />
            Commision to collection owner
          </label>
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
