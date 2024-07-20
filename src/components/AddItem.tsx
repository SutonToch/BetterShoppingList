import { SetStateAction, useState } from "react";
import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import { Plus } from "./Icons";

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

  return (
    <>
      <TitleRow 
        title="Liste 1"
        backOnClick={() => props.setScene("main")}
      />       
      <main>
        <ItemList 
          itemList={itemList}
          setItemList={props.setItemList}
          setScene={props.setScene}
          setCurrentItemDetails={props.setCurrentItemDetails}
          mode={"add"}
        />
      </main>
      <div>
        <input 
          type="search" 
          placeholder="Suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="add-item-btn add-to-list-btn" 
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
