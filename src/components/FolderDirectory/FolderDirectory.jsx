import React from 'react'
import { useState } from 'react'
import './FolderDirectory.css'
import { RowItem } from '../RowItem/RowItem';

const FolderDirectory = () => {

    const [items, setItems] = useState([{
        id: "root|Folder|0",
        name: "root",
        type: "Folder",
        children: [{
            id: "new|Folder|1",
            name: "new",
            type: "Folder",
            children: [
                {
                    id: "new2|Folder|2",
                    name: "new2",
                    type: "Folder",
                    children: [],
                    expanded: true,
                    level: 2,
                    parentId: "new|Folder|1",
                }
            ],
            expanded: true,
            level: 1,
            parentId: "root|Folder|0",
        },{
            id: "newFile|Folder|1",
            name: "newFile",
            type: "File",
            children: [],
            expanded: true,
            level: 1,
            parentId: "root|Folder|0",
        }],
        expanded: true,
        parentId: null,
        level: 0
    }]);

    const updateItems = (event,index) => {
        const updatedItems = [...items];
        updatedItems[index] = event;
        setItems(updatedItems);
    }

    return (
        <div className='folder-directory'>
        {
            items.map((item, index) => {
                return (
                    <RowItem item={item} key={`${item.id}|${index}`} onItemsChange={(event) => updateItems(event,index)}></RowItem>
                )
            })
        }
        </div>
    )
}

export default FolderDirectory