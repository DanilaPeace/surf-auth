import UserInput from "../common/user-input/UserInput";

export const CommisionTab = () => {
    return (
        <div className="commitsion-tab">
            <UserInput 
                labelName="Minting price for users (EVERs)"
                inputName="Type price"
            />
        </div>
    );
}