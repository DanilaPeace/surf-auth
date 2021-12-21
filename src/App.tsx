import { Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './NavBar';
import DeployFromFile from './pages/deploy-fro-file-page/DeployFromFile';
import Home from './pages/home-page/Home';
import RootContract from './pages/root-contract-page/RootContract';
import CollectionList from './pages/collection-list-page/CollectionList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/root-contract-form" element={<RootContract />} />
        <Route path="/deploy-from-file" element={<DeployFromFile />} />
        <Route path="/collection-list" element={<CollectionList />} />
      </Routes>
    </div>
  );
}

export default App;
