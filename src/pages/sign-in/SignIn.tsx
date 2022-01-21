import React from "react";

const SignIn = () => {
  const onSignClick = (event) => {
    alert("Hello!");
  };

  return (
    <div>
      <button onClick={onSignClick}>Sign with EVER Wallet</button>
    </div>
  );
};

export default SignIn;
