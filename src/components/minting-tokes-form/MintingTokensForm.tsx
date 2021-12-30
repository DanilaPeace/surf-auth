import { Link } from "react-router-dom";

const MintingTokensForm = () => {
    return (
        <div className="container">
            <form action="" method="post" className="main-form">
                <div>
                    Rarities
                </div>
                <div>
                    Params
                </div>
                <div>
                    Enum
                </div>
                <div className="minting-sign-checkbox">
                    Sing token
                    <input type="checkbox" name="sing" />
                    <div className="sign-inputs">
                        <div className="sign-input-item">
                            Seed phrase
                            <input className="form-control user-input" type="text" name="" id="" />
                        </div>
                        <div className="sign-input-item">
                            Sign address
                            <input className="form-control user-input" type="text" name="" id="" />
                        </div>
                    </div>
                </div>
                <div className="minting-tokens-btn">
                    <button type="submit" className="btn btn-blue">
                        <i className="fas fa-paper-plane mr-2"></i>
                        <Link to="/tokens-data-info">
                            Minitng Token
                        </Link>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MintingTokensForm;   