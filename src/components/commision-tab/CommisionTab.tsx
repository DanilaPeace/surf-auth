import { useState } from "react";
import UserInput from "../common/user-input/UserInput";
import './commision-tab.css';

import { store } from "../../store/MainStore";
import { observer } from "mobx-react";

const CommisionTab = observer(() => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="commitsion-tab">
            <div className="commision-tab__content">
                <div className="commision-checkbox mb-3">
                    <label>
                        <input type="checkbox"
                            onChange={() => setChecked(!checked)} />
                        Commision to collection owner
                    </label>
                    <div className={"commsion-input " + (checked ? 'active' : '')}>
                        <UserInput
                            labelName="Commision (%)"
                            inputName="Type commision here"
                            data={store.commistions.commissionFavorOwner.value}
                            onChange={store.commistions.onChangeCommissionFavorOwner}
                        />
                    </div>
                </div>
                <UserInput
                    labelName="Minting price for users (EVERs)"
                    inputName="Type price"
                    data={store.commistions.mintingPriceUsers}
                    onChange={store.commistions.onChangeMintingPriceUsers}
                />
            </div>
        </div>
    );
});

export default CommisionTab;