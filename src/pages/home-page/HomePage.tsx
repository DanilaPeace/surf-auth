import "./home-page.css";

function Home() {
  return (
    <div className="home container">
      <h1 className="home__title">NFT Collection Generator</h1>
      <div className="home-content">
        <div className="home-content__title">
          This is NFT Collection Generator with it you can create any
          collections
        </div>
        <div className="home-features d-flex">
          <div className="feature-item">
            <h2 className="feature-item__title">
              <i className="fas fa-shield-alt"></i>
              Secure
            </h2>
            <div className="feature-item__text">
              You cannot worry about the safety your collections of the tokens
            </div>
          </div>
          <div className="feature-item">
            <h2 className="feature-item__title">
              <i className="fas fa-location-arrow"></i>
              Сomfortable
            </h2>
            <div className="feature-item__text">
              Did you think that creating your collection is difficult? With our
              generator, you can create your first collection easily without
              knowing any additional information.
            </div>
          </div>
          <div className="feature-item">
            <h2 className="feature-item__title">
              <i className="fas fa-key"></i>
              Private
            </h2>
            <div className="feature-item__text">
              You can greate your NFT collection and another user can create
              tokens of this collection. They can buy, exchange, and sell their
              tokes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
