import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import MainCollectionInfo from '../main-collection-info/MainCollectionInfo';

function RootContractForm() {
    return(
        <form action="" className="root-contract-form">
            <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3 ">
                    <Tab eventKey="main" title="Main">
                      <MainCollectionInfo />
                    </Tab>
                    <Tab eventKey="rarity" title="Rarity">
                      Some2
                    </Tab>
                    <Tab eventKey="commitsion" title="Commision">
                      Some3
                    </Tab>
                    <Tab eventKey="parameters" title="Token Parameters">
                      Some4
                    </Tab>
            </Tabs>
        </form>
    );
}

export default RootContractForm;