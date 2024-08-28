import { useState } from "react";
import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import { Plus } from "./Icons";
import { useAppContext } from "../App";

export default function AddItem() {
  const [searchTerm, setSearchTerm] = useState("")
  const {allItems, setCurrentItemDetails, setScene, activeListName} = useAppContext()
  
  let filteredItemList = allItems.filter((item) => {return item.lists.includes(activeListName)})
  if(searchTerm) {
    filteredItemList = filteredItemList.filter(
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <>
      <TitleRow
        title={activeListName}
        backOnClick={() => setScene("main")}
      />       
      <main
        //temporary work-around for a strange style issue on mobile. Further tests required.
        style={searchTerm ? {height: "270px"} : {height: "auto"}}
      >
        <ItemList
          filteredItemList={filteredItemList}
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
            setScene("newOrEditItem")
            setCurrentItemDetails({edit: false, title: ""})
          }}
        >
          <Plus size={40}/>
        </button>
      </div>
    </>
  )
}
