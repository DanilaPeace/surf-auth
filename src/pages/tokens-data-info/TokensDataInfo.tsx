import React from 'react';
import './tokens-data-info.css'

class TokensDataInfo extends React.Component {

  render() {
    return (
      <div className="tokens-data-box-main">
        <div className="tokens-data-container container">
          <div className="row">
            <div className="col-4"><p className="text text-main">Root address: </p></div>
            <div className="col-8"><p className="text">0:a401e3297e84bae9132cc38c860839a71ef9b2bb75a036e41987cbcb431ddffd </p></div>
          </div>
          <div className="row">
            <div className="col-4"><p className="text text-main">Collection name: </p></div>
            <div className="col-8"><p className="text">0:a401e3297e84bae9132cc38c860839a71ef9b2bb75a036e41987cbcb431ddffd </p></div>
          </div>
          <div className="row">
            <div className="col-4"><p className="text text-main">Minting debot address:  </p></div>
            <div className="col-8"><p className="text">0:a401e3297e84bae9132cc38c860839a71ef9b2bb75a036e41987cbcb431ddffd </p></div>
          </div>
          <div className="row">
            <div className="col-4"><p className="text text-main">Selling debot address:  </p></div>
            <div className="col-8"><p className="text">0:a401e3297e84bae9132cc38c860839a71ef9b2bb75a036e41987cbcb431ddffd </p></div>
          </div>
          <div className="row">
            <div className="col-4"><p className="text text-main">Token Purchase debot address: </p></div>
            <div className="col-8"><p className="text">0:a401e3297e84bae9132cc38c860839a71ef9b2bb75a036e41987cbcb431ddffd </p></div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <button className="btn btn-blue btn-debot">Go to MintingDebot</button>
            </div>
            <div className="col-lg-4">
              <button className="btn btn-blue btn-debot">Go to SaleDebot</button>
            </div>
            <div className="col-lg-4">
              <button className="btn btn-blue btn-debot">Go to TokenPurchaseDebot</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TokensDataInfo;
