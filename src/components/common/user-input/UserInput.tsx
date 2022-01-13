import './user-input.css'

function UserInput(
    { labelName, inputName, onChange, data, inputType }: { labelName: string, inputName: string, onChange?: (arg: any) => void, data?: any, name?:any,inputType:string}
) {
    return (
        <div className="user-input-content flex-grow-1 px-3">
            <label htmlFor={inputName}>{labelName}</label>
            <input
                name={inputName}
                type={inputType} 
                className="form-control user-input"
                placeholder={inputName}
                onChange={onChange}
                value={data} />
        </div>
    );
};
export default UserInput;