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
      <>
        <label htmlFor={inputData.htmlFor}>{`${inputData.labelName}:`}</label>
        <input
          onChange={onSignInputChange}
          type="text"
          className="form-control user-input"
          name={inputData.name}
          value={inputData.value}
        />
      </>
    );
  });

  return (
    <div className="SignField">
      <label htmlFor="sign-block-checkbox">Sign token</label>
      <input type="checkbox" onChange={() => setSing(!signIsChecked)} />
      <div className={"sing-block-inputs " + (signIsChecked ? " active" : "")}>
        {singInputs}
      </div>
    </div>
  );
};

export default SignField;
