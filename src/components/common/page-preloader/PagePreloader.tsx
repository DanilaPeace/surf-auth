import { ReactComponent as Preloader } from "./preloader.svg";

import "./page-preloader.css";

const PagePreloader = () => {
  return (
    <div className="preloader">
      <div className="preloader-container">
        <div className="preloader-body">
          <Preloader />
          <div className="loading-title">Page is loading...</div>
        </div>
      </div>
    </div>
  );
};

export default PagePreloader;
