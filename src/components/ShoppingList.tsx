import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import { Plus } from "./Icons";
import { useAppContext } from "../App";
import { useState } from "react";

interface ShoppingListProps {
  setAllListNames:React.Dispatch<React.SetStateAction<string[]>>
  setActiveList:React.Dispatch<React.SetStateAction<string>>
} 

export default function ShoppingList(props:ShoppingListProps) {
  const {allItems, setScene, allListNames, activeListName} = useAppContext()
  const [listWithActiveMouseDown, setListWithActiveMouseDown] = useState("")
  const [timeoutToDeleteList, setTimeoutToDeleteList] = useState<NodeJS.Timeout | null>(null);
  
  const listElements = allListNames.map((listName, index) => {
    const listNameWithWhitespace = listName.slice(0, -1) + " " + listName.slice(-1);
    const isActiveList = (listName == activeListName)
    const onListNotDoneCount = allItems.filter(item => 
      item.onList && !item.done && item.lists.includes(listName)).length;

    return(
      <div 
        className={isActiveList ? "list-selection-item active" : "list-selection-item"}
        style={{backgroundColor: timeoutToDeleteList && listName == listWithActiveMouseDown ? "red" : "" }}
        onClick={() => updateActiveList(listName)}
        onMouseDown={() => {
          removeList(listName)
          setListWithActiveMouseDown(listName)
        }}
        onTouchStart={() => {
          removeList(listName)
          setListWithActiveMouseDown(listName)
        }}
        onMouseUp={() => {timeoutToDeleteList ? abortRemoveList(timeoutToDeleteList) : ""}}
        onTouchEnd={() => {timeoutToDeleteList ? abortRemoveList(timeoutToDeleteList) : ""}}
        onMouseOut={() => {timeoutToDeleteList ? abortRemoveList(timeoutToDeleteList) : ""}}
        onTouchCancel={() => {timeoutToDeleteList ? abortRemoveList(timeoutToDeleteList) : ""}}
        key={index}
      >
        {listNameWithWhitespace} ({onListNotDoneCount})
      </div>
    )
  })

  function addNewList() {
    const newList = `Liste${allListNames.length+1}`
    props.setAllListNames([...allListNames, newList])
  }

  function updateActiveList(newActiveList:string) {
    if(!allListNames.includes(newActiveList)) {
      console.error("Could not update active list because " + newActiveList + " is an unknown list.")
      return;
    }
    props.setActiveList(newActiveList)
  }

  function removeList(listToRemove:string) {
    const timeout = setTimeout(() => {
      const updatedLists = allListNames.filter((listsItem) => {
        if(listsItem != listToRemove) {
          return true;
        }
      })
      if(updatedLists.length == 0) {
        console.error("Can not remove the last list.")
        return;
      }
      if(listToRemove == activeListName) {
        updateActiveList(updatedLists[0])
      }
      props.setAllListNames(updatedLists)
    }, 4000)
    setTimeoutToDeleteList(timeout);
  }

  function abortRemoveList(timeoutToDeleteList: NodeJS.Timeout | null) {
    if(!timeoutToDeleteList) {
      return;
    }

    clearTimeout(timeoutToDeleteList)
    setTimeoutToDeleteList(null)
  }
  
  return (
    <>
      <TitleRow title={activeListName} />
      <main>
        <ItemList />
        <ItemList mode={"done"} />
      </main>
      <div className="control-bar wrapper">
        <button className="add-item-btn" onClick={() => setScene("addItem")}>
          <Plus size={40}/>
        </button>
      </div>
      <div className="list-selection">
        {listElements}
        <div className="add-new-list" onClick={addNewList}>
          <Plus size={40}/>
        </div>
      </div>
    </>
  )
}
