import './user-input.css'

function UserInput(
    { labelName, inputName }: { labelName: string, inputName: string }
) {
    return (
        <div className="user-input-content flex-grow-1 px-3">
            <label htmlFor={inputName}>{labelName}</label>
            <input 
                name={inputName} 
                type="text" 
                className="form-control user-input" 
                placeholder={inputName} />
        </div>
    );
};

export default UserInput;