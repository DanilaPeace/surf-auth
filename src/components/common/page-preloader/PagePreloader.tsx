import { ReactComponent as Preloader } from "./preloader.svg";

import "./page-preloader.scss";

const PagePreloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="preloader__body">
          <Preloader />
          <div className="preloader__title">Page is loading...</div>
        </div>
      </div>
    </div>
  );
};

export default PagePreloader;
