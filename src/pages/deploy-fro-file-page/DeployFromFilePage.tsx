import './deploy-from-file-page.css';
import {store} from '../../store/MainSotre'
import { observer } from 'mobx-react-lite';
import React from "react"

const DeployFromFile = () => {
    const [uploadFile, setUploadFile] = React.useState();

    const submitForm = (event:any) => {
        event.preventDefault();
        fetch('http://localhost:3001/deploy-from-file', {                                             ///???????
            method: 'POST',
            body: uploadFile![0],
        })
        .then(result => {
        console.log('Success:', result);
        })
        .catch(error => {
        console.error('Error:', error);
        });
      };
    
    return (
        <div className="container">
            <form action="" className="deploy-from-file-page" onSubmit={submitForm}>
                <input type = "file" className = "btn-blue" onChange={(e:any) => setUploadFile(e.target.files)} ></input><br />
                <button className='btn root-contract-btn btn-blue'>
                <i className="fas fa-paper-plane mr-2"></i>
                Deploy contracts
                </button>
            </form>
        </div>
    );
}

export default DeployFromFile;