import React, { FC } from "react";

import { user } from "../../store/user/UserStore";

const SignIn: FC = () => {
  const onSignClick = async (event) => {
    event.preventDefault();
    await user.logIn();
  };

  return (
    <div>
      <button className="btn btn-blue" onClick={onSignClick}>
        Sign with EVER Wallet
      </button>
    </div>
  );
};

export default SignIn;
