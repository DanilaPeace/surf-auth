import UserInput from '../common/user-input/UserInput';
import './rarity-collection-info.css';
import React,{useState} from "react"

var count = 0

function RarityCollectionInfo() {
    const [checked, setChecked] = useState(false);
    const [quantity_field, setQuantity_field] = useState([0]);
    
    function handleChange() {
		setChecked(!checked);
	}
    const click_on_btn_add = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        count=count+1
        setQuantity_field([...quantity_field,count])
        // arr_quantity_field.push(quantity_field)
    }
    const click_on_btn_del = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if(count-1 >= 0){
            setQuantity_field([...quantity_field.slice(0, count), ...quantity_field.slice(count + 1)]);
            count=count-1
        }
        //setQuantity_field([...quantity_field,count])
    }
    return(
        <div className="">
            <div className='checkboxForRarity'>
            
                <input type="checkbox" checked={checked} onChange={handleChange}/>
                <label >Use Rarity Types for tokens</label>
            </div>
            
            {checked ?
            <div>
                <div> 
                {quantity_field.map((n) => {
                return (
                        <p><div className="rarity-info-inputs"> 
                        <UserInput
                            labelName='Rarity Type For Token' 
                            inputName='Rarity Type For Token'/>
                        <UserInput 
                            labelName='Maximum tokens number for type' 
                            inputName='Maximum tokens number for type'/>  
                    </div></p>
                    )
                })} 
                </div>
                <button onClick={click_on_btn_add}>+</button>
                <button onClick={click_on_btn_del}>-</button> 
            </div>
            : ""}

        </div>
    )
}

export default RarityCollectionInfo;