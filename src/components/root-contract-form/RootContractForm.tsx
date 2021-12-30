import './root-contract-form.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MainCollectionInfoTab from '../main-collection-info-tab/MainCollectionInfoTab';
import CommisionTab from '../commision-tab/CommisionTab';
import ParameterForm from '../parameter-form/ParameterForm';
import RarityForm from '../rarity-form/RarityForm';
import { useNavigate } from "react-router-dom";

const RootContractForm = () => {
  let navigate = useNavigate();

  const saveData = () => {
    // fetch('http://example.com/movies.json')
    // .then((response) => {
    navigate("/deploy-from-file", { state: {test:"test"} });
    // })
  }

  const generateContractsCode = () => {
    // fetch('http://example.com/movies.json')
    // .then((response) => {
    navigate("/deploy-from-file", { state: {test:"test"} });
    // })
  }

  const deployContracts = async () => {
    // fetch('http://example.com/movies.json')
    // .then((response) => {
    navigate("/tokens-data-info", { state: {test:"test"} });
    // })
  }

return (
  <form action="" className="root-contract-form">
    <Tabs
      defaultActiveKey="main"
      transition={false}
      id="root-contract-tabs"
      className="mb-3">
      <Tab eventKey="main" title="Main" className='root-contract-tab-item'>
        <MainCollectionInfoTab />
      </Tab>
      <Tab eventKey="rarity" title="Rarity" className='root-contract-tab-item'>
        <RarityForm />
      </Tab>
      <Tab eventKey="commitsion" title="Commision" className='root-contract-tab-item'>
        <CommisionTab />
      </Tab>
      <Tab eventKey="parameters" title="Token Parameters" className='root-contract-tab-item'>
        <ParameterForm />
      </Tab>
    </Tabs>
    <div className="btn-toolbar root-contract-btn-toolbar">
      <button onClick={saveData} className='btn root-contract-btn btn-blue'>
        <i className="fas fa-file-download mr-2"></i>
        Save data
      </button>
      <button onClick={generateContractsCode} className='btn root-contract-btn btn-blue'>
        <i className="far fa-calendar-plus mr-2"></i>
        Generate contracts Code</button>
      <button onClick={deployContracts} className='btn root-contract-btn btn-blue'>
        <i className="fas fa-paper-plane mr-2"></i>
        Deploy contracts
      </button>
    </div>
  </form>
);
}

export default RootContractForm;
