import React from "react";
import ton from "ton-inpage-provider";

const SignIn = () => {
  const onSignClick = async (event) => {
    event.preventDefault();

    await ton.ensureInitialized();

    const { accountInteraction } = await ton.requestPermissions({
      permissions: ["tonClient", "accountInteraction"],
    });
    if (accountInteraction == null) {
      throw new Error("Insufficient permissions");
    }

    console.log("ACCOUNT: ", accountInteraction);
  };

  return (
    <div>
      <button onClick={onSignClick}>Sign with EVER Wallet</button>
    </div>
  );
};

export default SignIn;
