import './user-input.css'

function UserInput(
    { placeholderName, inputName }: { placeholderName: string, inputName: string }
) {
    return (
        <div className="user-input-content">
            <label htmlFor={inputName}>{inputName}</label>
            <input 
                name={inputName} 
                type="text" 
                className="form-control" 
                placeholder={placeholderName} />
        </div>
    );
};

export default UserInput;