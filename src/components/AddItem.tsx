import { SetStateAction, useState } from "react";
import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import { Plus } from "./Icons";
import { itemType } from "../App";

interface AddItemProps {
  itemList:Array<any>
  setItemList:React.Dispatch<SetStateAction<any>>
  setScene:React.Dispatch<React.SetStateAction<string>>
  setCurrentItemDetails:React.Dispatch<React.SetStateAction<{
    edit: boolean;
    title: string;
  }>>
}

export default function AddItem(props:AddItemProps) {
  const [searchTerm, setSearchTerm] = useState("")
  let itemList = props.itemList

  if(searchTerm) {
    itemList = itemList.filter(
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  function setItemListAndClearSearchTerm(newItemList:itemType[]) {
    setSearchTerm("")
    props.setItemList(newItemList)
  }

  return (
    <>
      <TitleRow 
        title="Liste 1"
        backOnClick={() => props.setScene("main")}
      />       
      <main>
        <ItemList 
          itemList={itemList}
          setItemList={setItemListAndClearSearchTerm}
          setScene={props.setScene}
          setCurrentItemDetails={props.setCurrentItemDetails}
          mode={"add"}
        />
      </main>
      <div className="add-item-search-wrapper">
        <input 
          type="search" 
          placeholder="Suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="add-item-search"
        />
        <button 
          className="add-item-btn" 
          style={{marginTop: "auto"}} 
          onClick={() => {
            props.setScene("newOrEditItem")
            props.setCurrentItemDetails({edit: false, title: ""})
          }}
        >
          <Plus size={40}/>
        </button>
      </div>
    </>
  )
}
