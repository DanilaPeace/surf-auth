import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from '../NavBar/NavBar';
import DeployFromFile from '../../pages/deploy-fro-file-page/DeployFromFilePage';
import Home from '../../pages/home-page/HomePage';
import RootContractForm from '../../pages/root-contract-page/RootContractPage';
import CollectionList from '../../pages/collection-list-page/CollectionListPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/root-contract-form" element={<RootContractForm />} />
        <Route path="/deploy-from-file" element={<DeployFromFile />} />
        <Route path="/collection-list" element={<CollectionList />} />
      </Routes>
    </div>
  );
}

export default App;
