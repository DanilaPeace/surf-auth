import UserInput from '../common/user-input/UserInput';
import './main-collection-info.css';

function MainCollectionInfo() {
    return(
        <div className="main-collection-info">
            <div className="main-info-inputs">
                <UserInput
                    placeholderName='Collection name' 
                    inputName='Collection name'/>    
                <UserInput 
                    placeholderName='Maximum number of tokenes' 
                    inputName='Maximum number of tokenes'/>    
            </div>
        </div>
    )
}

export default MainCollectionInfo;