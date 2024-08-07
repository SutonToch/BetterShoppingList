import { SetStateAction, useState } from "react"
import "./../styles/itemList.css"
import { Delete, Edit, Plus } from "./Icons"
import { doneAtMax } from "../App"

interface ItemListProps {
    itemList:Array<any>
    filteredItemList?:Array<any>
    setItemList:React.Dispatch<SetStateAction<any>>
    setScene:React.Dispatch<React.SetStateAction<string>>
    setCurrentItemDetails:React.Dispatch<React.SetStateAction<{
      edit: boolean;
      title: string;
    }>>
    mode?:string
}

export default function ItemList(props:ItemListProps) {
  const [collapseDone, setCollapseDone] = useState(false);
  
  const itemList = props.itemList;
  let reducedItemList = []
  switch (props.mode) {
    case undefined: reducedItemList = 
      itemList.filter((item) => item.onList && !item.done)
      break;
    case "done": reducedItemList =
      itemList.filter((item) => item.onList && item.done)
      break;
    case "add": 
      if(props.filteredItemList) {
        reducedItemList = props.filteredItemList.filter((item) => !item.onList)
        break;
      }
      
      reducedItemList = itemList.filter((item) => !item.onList)
      break;
  }

  const itemListElements = reducedItemList.map((item) => {
    return (
        <li key={item.name} className="list-item">
            <p>{item.name}</p>
            {props.mode == undefined ?
              <div className="item-options">
                <div className="edit" onClick={(e) => openEditItem(e)}><Edit /></div>
                <div className="delete" onClick={(e) => unlistItem(e)}><Delete /></div>
                <div className="checkbox" 
                  onClick={(e) => changeItemDone(e, true)} />
              </div> : ""
            }
            {props.mode == "done" ? 
              <div className="item-options">
                <div className="edit" onClick={(e) => openEditItem(e)}><Edit /></div>
                <div className="delete" onClick={(e) => unlistItem(e)}><Delete /></div>
                <div className="checkbox-checked" 
                  onClick={(e) => changeItemDone(e, false)} />
              </div> : ""
            }
            {props.mode == "add" ?
              <div className="item-options item-list-add">
                <div className="edit" onClick={(e) => openEditItem(e)}><Edit /></div>
                <div className="delete" onClick={(e) => deleteItem(e)}><Delete /></div>
                <button className="add-box" onClick={(e) => addToList(e)}>
                  <Plus size={20}/>
                </button>
              </div> : ""
            }
        </li>
    )
  })

  function getClickedItemName(e: any) {
    return e.currentTarget.parentNode.previousElementSibling.textContent;
  }

  function openEditItem(e: any) {
    const nameOfTickedItem = getClickedItemName(e);
    props.setCurrentItemDetails({
      edit: true,
      title: nameOfTickedItem
    })
    props.setScene("newOrEditItem")
  }

  function unlistItem(e: any) {
    const nameOfTickedItem = getClickedItemName(e);
    const newItemList = itemList.map((item) => {
      if(item.name !== nameOfTickedItem) {
        return item;
      }

      return {...item, onList: false, done: false}
    })
    props.setItemList(newItemList)

  }

  function changeItemDone(e: any, targetDone: boolean) {
    let newDoneAt = 0;
    if(targetDone) {
      newDoneAt = Date.now()
    } else {
      newDoneAt = doneAtMax
    }

    const nameOfTickedItem = getClickedItemName(e);
    const newItemList = itemList.map((item) => {
      if(item.name !== nameOfTickedItem) {
        return item;
      }

      return {...item, done: targetDone, doneAt: newDoneAt}
    })
    props.setItemList(newItemList)
  }

  function deleteItem(e: any) {
    const nameOfTickedItem = getClickedItemName(e);
    const newItemList = itemList.filter((item) => item.name != nameOfTickedItem)
    props.setItemList(newItemList)
  }

  function addToList(e: any) {
    const nameOfAddedItem = getClickedItemName(e);
    const newItemList = itemList.map((item) => {
      if(item.name !== nameOfAddedItem) {
        return item;
      }

      return {...item, onList: true}
    })
    props.setItemList(newItemList)
  }

  return (
    <>
        <ul className="itemList wrapper">
            {props.mode == "done" ? 
            <div className="itemList-done-header">
              <p>zuletzt abgehakt</p>
              <div 
                className={collapseDone ? "collapse-arrow done-collapsed" : "collapse-arrow done-open"}
                onClick={() => setCollapseDone(prevState => !prevState)}
              />
            </div>
            : ""}
            {collapseDone ? <li></li> : itemListElements}
        </ul>
    </>
  )
}
