import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from '../NavBar/NavBar';
import DeployFromFile from '../../pages/deploy-fro-file-page/DeployFromFilePage';
import Home from '../../pages/home-page/HomePage';
import RootContractPage from '../../pages/root-contract-page/RootContractPage';
import CollectionList from '../../pages/collection-list-page/CollectionListPage';
import { CollectionInfo } from '../collection-info/CollectionInfo';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/root-contract-form" element={<RootContractPage />} />
        <Route path="/deploy-from-file" element={<DeployFromFile />} />
        <Route path="/collection-list" element={<CollectionList />} />
        <Route path="/collection-info" element={<CollectionInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
