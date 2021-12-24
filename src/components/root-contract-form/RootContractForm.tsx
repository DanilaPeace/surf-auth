import './root-contract-form.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MainCollectionInfo from '../main-collection-info/MainCollectionInfo';

function RootContractForm() {
  const saveData = (props: any) => {
    alert(props);
  }

  return (
    <form action="" className="root-contract-form">
      <Tabs
        defaultActiveKey="main"
        transition={false}
        id="root-contract-tabs"
        className="mb-3">
        <Tab eventKey="main" title="Main" className='root-contract-tab-item'>
          <MainCollectionInfo />
        </Tab>
        <Tab eventKey="rarity" title="Rarity" className='root-contract-tab-item'>
          Some2
        </Tab>
        <Tab eventKey="commitsion" title="Commision" className='root-contract-tab-item'>
          Some3
        </Tab>
        <Tab eventKey="parameters" title="Token Parameters" className='root-contract-tab-item'>
          Some4
        </Tab>
      </Tabs>
      <div className="btn-toolbar root-contract-btn-toolbar">
        <button className='btn root-contract-btn btn-blue' onClick={saveData}>
          <i className="fas fa-file-download mr-2"></i>
          Save data
        </button>
        <button className='btn root-contract-btn btn-blue'>
          <i className="far fa-calendar-plus mr-2"></i>
          Generate contracts Code</button>
        <button className='btn root-contract-btn btn-blue mr-2'>
          <i className="fas fa-paper-plane"></i>
          Deploy contracts
        </button>
      </div>
    </form>
  );
}

export default RootContractForm;