import UserInput from '../common/user-input/UserInput';
import './main-collection-info.css';

function MainCollectionInfoTab() {
    return(
        <div className="main-collection-info">
            <div className="main-info-inputs">
                <UserInput
                    labelName="Collection name" 
                    inputName="Collection name"/>    
                <UserInput 
                    labelName="Collection name" 
                    inputName="Maximum number of tokenes"/>    
            </div>
        </div>
    )
}

export default MainCollectionInfoTab;