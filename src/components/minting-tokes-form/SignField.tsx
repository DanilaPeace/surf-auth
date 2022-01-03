import { useState } from "react";
const SignField = ({ paramsForMint, signFieldChange }) => {
  const [signIsChecked, setSing] = useState(false);

  const signInputData = [
    {
      labelName: "Seed-phrase",
      htmlFor: "seed-phrase",
      name: "seed-phrase",
      value: paramsForMint["seed-phrase"],
    },
    {
      labelName: "Sign-address",
      htmlFor: "sign-address",
      name: "sign-address",
      value: paramsForMint["sign-address"],
    },
  ];

  const onSignInputChange = (event) => {
    signFieldChange({
      ...paramsForMint,
      [event.target.name]: event.target.value,
    });
  };

  const singInputs = signInputData.map((inputData) => {
    return (
      <div className="sign-block-item">
        <label htmlFor={inputData.htmlFor} >{inputData.labelName}:</label>
        <input
          onChange={onSignInputChange}
          type="text"
          className="form-control user-input"
          name={inputData.name}
          value={inputData.value}
        />
      </div>
    );
  });

  return (
    <div className="SignField">
      <label htmlFor="sign-checkbox" className="SignField-title">Sign token</label>
      <input type="checkbox" name="sign-checkbox" onChange={() => setSing(!signIsChecked)} />
      <div className={"sing-block-inputs " + (signIsChecked ? " active" : "")}>
        {singInputs}
      </div>
    </div>
  );
};

export default SignField;
