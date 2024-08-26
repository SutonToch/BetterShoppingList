import { useState } from "react";
import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import { Plus } from "./Icons";
import { useAppContext } from "../App";

export default function AddItem() {
  const [searchTerm, setSearchTerm] = useState("")
  const {allItemList, setCurrentItemDetails, setScene, activeList} = useAppContext()
  
  let filteredItemList = allItemList
  if(searchTerm) {
    filteredItemList = filteredItemList.filter(
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return (
    <>
      <TitleRow
        title={activeList}
        backOnClick={() => setScene("main")}
      />       
      <main>
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
