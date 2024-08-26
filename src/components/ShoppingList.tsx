import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import { Plus } from "./Icons";
import { useAppContext } from "../App";
import { useState } from "react";

interface ShoppingListProps {
  setAllLists:React.Dispatch<React.SetStateAction<string[]>>
  setActiveList:React.Dispatch<React.SetStateAction<string>>
} 

export default function ShoppingList(props:ShoppingListProps) {
  const {allItemList, setScene, allLists, activeList} = useAppContext()
  const [timeoutToDeleteList, setTimeoutToDeleteList] = useState<NodeJS.Timeout | null>(null);
  const onListNotDoneCount = allItemList.filter(item => item.onList && !item.done).length;
  
  const listElements = allLists.map((listsItem, index) => {
    const isActiveList = (listsItem == activeList)
    return(
      <div 
        className={isActiveList ? "list-selection-item active" : "list-selection-item"}
        onClick={() => updateActiveList(listsItem)}
        onMouseDown={() => removeList(listsItem)}
        onMouseUp={() => {timeoutToDeleteList ? clearTimeout(timeoutToDeleteList) : ""}}
        onMouseOut={() => {timeoutToDeleteList ? clearTimeout(timeoutToDeleteList) : ""}}
        key={index}
      >
        {listsItem} ({onListNotDoneCount})
      </div>
    )
  })

  function addNewList() {
    const newList = `Liste${allLists.length+1}`
    props.setAllLists([...allLists, newList])
  }

  function updateActiveList(newActiveList:string) {
    if(!allLists.includes(newActiveList)) {
      console.error("Could not update active list because " + newActiveList + " is an unknown list.")
      return;
    }
    props.setActiveList(newActiveList)
  }

  function removeList(listToRemove:string) {
    const timeout = setTimeout(() => {
      const updatedLists = allLists.filter((listsItem) => {
        if(listsItem != listToRemove) {
          return true;
        }
      })
      if(updatedLists.length == 0) {
        console.error("Can not remove the last list.")
        return;
      }
      if(listToRemove == activeList) {
        updateActiveList(updatedLists[0])
      }
      props.setAllLists(updatedLists)
    }, 4000)
    setTimeoutToDeleteList(timeout);
  }
  
  return (
    <>
      <TitleRow title={activeList} />
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
