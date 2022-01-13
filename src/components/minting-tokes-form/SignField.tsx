import { useState } from "react";
const SignField = ({ mintParams, signFieldChange }) => {
  const [signIsChecked, setSing] = useState(false);
  const signInputData = [
    {
      labelName: "Seed-phrase",
      htmlFor: "seed-phrase",
      name: "seed-phrase",
      value: mintParams["seed-phrase"],
    },
    {
      labelName: "Sign-address",
      htmlFor: "sign-address",
      name: "sign-address",
      value: mintParams["sign-address"],
    },
  ];

  const onSignInputChange = (event) => {
    signFieldChange({
      ...mintParams,
      [event.target.name]: event.target.value,
    });
  };

  const singInputs = signInputData.map((inputData, idx) => {
    return (
      <div className="sign-block-item" key={idx}>
        <label htmlFor={inputData.htmlFor}>{inputData.labelName}:</label>
        <input
          onChange={onSignInputChange}
          type="text"
          className="form-control user-input"
          name={inputData.name}
        />
      </div>
    );
  });

  return (
    <div className="SignField">
      
      <input
        className="form-check-input"
        type="checkbox"
        name="sign-checkbox"
        onChange={() => setSing(!signIsChecked)}
      />
      <label htmlFor="sign-checkbox" className="SignField-title">
        Sign token
      </label>
      <div className={"sing-block-inputs " + (signIsChecked ? " active" : "")}>
        {singInputs}
      </div>
    </div>
  );
};

export default SignField;
