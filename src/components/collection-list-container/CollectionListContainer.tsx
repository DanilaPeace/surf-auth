import { useEffect, useState } from "react";
import CollectionListItem from "../collection-list-item/CollectionListItem";

const CollectionListContainer = () => {
    const [collectionList, setCollectionList] = useState([]);

    const getCollectionListApi = () => {
        fetch('http://localhost:4001/collection-list')
            .then(res => res.json())
            .then(data => {
                setCollectionList(data.collectionList)
            })
            .catch(error => console.log(`Error: ${error}`));
    }

    useEffect(getCollectionListApi, []);

    return (
        <div className="CollectionListContainer container">
            {
                collectionList.map(collection => <CollectionListItem {...collection} />)
            }
        </div>
    )
}

export default CollectionListContainer;