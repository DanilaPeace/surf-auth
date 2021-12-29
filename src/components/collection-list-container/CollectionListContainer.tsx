import { useState } from "react"

import CollectionListItem from "../collection-list-item/CollectionListItem";

const CollectionListContainer = () => {
    const testCollectionArray = [
        {
            collection: 'Collection1',
            address: '0:5855f2561d5e5845bc3ac0625267216cc5e1b77db21c241b6561ea9ead47db66'
        },
        {
            collection: 'Collection2',
            address: '0:df67b8f5287c06e5c1b751c1ebe41fa4b54d40c8aa3c1716ecb160c8227a0048'
        }
    ];

    return (
        <div className="CollectionListContainer container">
            {
                testCollectionArray.map(collection => <CollectionListItem {...collection}/>)
            }
        </div>
    )
}

export default CollectionListContainer;