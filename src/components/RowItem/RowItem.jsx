import React, { useState, useRef } from 'react'
import './RowItem.css'

export const RowItem = ({item, onItemsChange}) => {
  const inputRef = useRef(null);
  const [addingSubItemForId, setAddingSubItemForId] = useState('');
  const [addingSubItem, setAddingSubItem] = useState({});

  const handleAddItemClick = (item, type) => {
    setAddingSubItemForId(item.id);
    setAddingSubItem({
      type,
      children: [],
      expanded: true,
      level: item.level + 1,
      parentId: item.id
    })

    setTimeout(() => {
      inputRef.current.focus();
    }, 10)
  }

  const addItemChild = () => {
    console.log(addingSubItem)
    item.children.push(addingSubItem);
    onItemsChange(item);
  }

  const handleInputKeyDown = (event) => {
    if(event.key === "Enter") {
      if(event.target.value.length > 0) {
        setAddingSubItem( state => {
          const newItem = { 
            id: `${event.target.value}|${state.type}|${state.level}`,
            name: event.target.value,
            ...state
          }
          return newItem;
        })
        setTimeout(() => {
          addItemChild();
        },200)
      }
      setTimeout(()=> {
        setAddingSubItemForId('');
        setAddingSubItem({});
      },20)
    }
  }

  const handleBlur = (event) => {
    if(event.target.value.length > 0) {
      setAddingSubItem( state => {
        const newItem = { 
          id: `${event.target.value}|${state.type}|${state.level}`,
          name: event.target.value,
          ...state
        }
        return newItem;
      })
      setTimeout(() => {
        addItemChild();
      },200)
    }
    setTimeout(()=> {
      setAddingSubItemForId('');
      setAddingSubItem({});
    },20)
  }

  const onAddChildToChild = (childData, childIndex) => {
    item.children[childIndex] = childData;
    onItemsChange(item);
  }

  return (
    <div style={{paddingLeft: 40}}>
      <div className="row-item">
          <span className="item-type-icon-wrapper">
          {
              item.type === "Folder" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>
              ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/></svg>
              )
          }
          </span>
          <span className='item-name-wrapper'>{item.name}</span>
          {
            item.type === "Folder" ? (
                <span className='button-group'>
                <button onClick={() => handleAddItemClick(item, 'Folder')}>+ Add Folder</button>
                <button onClick={() => handleAddItemClick(item, 'File')}>+ Add File</button>
                </span>
            ) : (
                <></>
            )
          }
      </div>
      {
        item.children.length > 0 && item.expanded === true ? (
          item.children.map((childItem, index) => {
            return(
              <RowItem item={childItem} key={`${childItem.id}|${index}`} onItemsChange={(event) => onAddChildToChild(event,index)}></RowItem>
            )
          })
        ) : (
          <></>
        )
      }
      {
        addingSubItemForId === item.id ? (
        <div className='add-item-input-wrapper'>
            <span className="item-type-icon-wrapper add-item-icon">
              {
                addingSubItem.type === "Folder" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z"/></svg>
                ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/></svg>
                )
              }
            </span>
            <input className="add-item-input" type='text' onKeyDown={() => handleInputKeyDown(event)} onBlur={() => handleBlur(event)} ref={inputRef}/>
        </div>
        ) : (
        <></>
        )
      }
    </div>
  )
}
