import UserInput from '../common/user-input/UserInput';
import './main-collection-info.css';

import {store} from '../../store/MainSotre'
import { observer } from 'mobx-react-lite';

const MainCollectionInfoTab = observer(() => {
    return(
        <div className="main-collection-info">
            <div className="main-info-inputs">
                <UserInput
                    labelName="Collection name" 
                    inputName="Collection name"
                    onChange={store.changeCollectionName}
                    data={store.collectionName}/>    
                <UserInput 
                    labelName="Maximum number of tokenes" 
                    inputName="Maximum number of tokenes"
                    onChange={store.changeMaxTokenNumber} 
                    data={store.maxTokenNumber}/>    
            </div>
        </div>
    )
})

export default MainCollectionInfoTab;