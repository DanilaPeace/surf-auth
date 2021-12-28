import React, { useState } from "react"

import UserInput from '../common/user-input/UserInput';

import './rarity-collection-info.css';

function RarityCollectionInfo() {
    const [count, setCount] = useState(0);
    const [checked, setChecked] = useState(false);
    const [quantityField, setQuantityField] = useState([0]);

    function handleChange() {
        setChecked(!checked);
    }
    const addBtn = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setCount(count => count + 1);
        setQuantityField([...quantityField, count])
    }
    const delBtn = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (count) {
            setQuantityField([...quantityField.slice(0, count)]);
            setCount(count => count - 1);
        }
    }
    return (
        <div className="">
            <div className='checkboxForRarity'>

                <input type="checkbox" checked={checked} onChange={handleChange} />
                <label >Use Rarity Types for tokens</label>
            </div>

            {checked ?
                <div>
                    <div>
                        {quantityField.map((n) => {
                            return (
                                <div className="rarity-info-inputs">
                                    {/* <UserInput
                                        labelName='Rarity Type For Token'
                                        inputName='Rarity Type For Token' />
                                    <UserInput
                                        labelName='Maximum tokens number for type'
                                        inputName='Maximum tokens number for type' /> */}
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={addBtn}>+</button>
                    <button onClick={delBtn}>-</button>
                </div>
                : ""}

        </div>
    )
}

export default RarityCollectionInfo;