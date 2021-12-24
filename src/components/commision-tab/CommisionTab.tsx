import { useState } from "react";
import UserInput from "../common/user-input/UserInput";
import './commision-tab.css';

export const CommisionTab = () => {
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
                        />
                    </div>
                </div>
                <UserInput
                    labelName="Minting price for users (EVERs)"
                    inputName="Type price"
                />
            </div>
        </div>
    );
}