import UserInput from '../common/user-input/UserInput';
import './main-collection-info.css';

function MainCollectionInfoTab({collectionName, maxTokenNum, collectionNameHandler, maxNumberHandler}: 
    {collectionName: string, maxTokenNum: number, collectionNameHandler: (name: string) => void, maxNumberHandler: (num: number) => void}) {
    return(
        <div className="main-collection-info">
            <div className="main-info-inputs">
                <UserInput
                    labelName="Collection name" 
                    inputName="Collection name"
                    onChange={collectionNameHandler}
                    data={collectionName}/>    
                <UserInput 
                    labelName="Maximum number of tokenes" 
                    inputName="Maximum number of tokenes"
                    onChange={maxNumberHandler} 
                    data={maxTokenNum}/>    
            </div>
        </div>
    )
}

export default MainCollectionInfoTab;