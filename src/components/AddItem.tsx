import { SetStateAction } from "react";
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

  return (
    <>
      <TitleRow 
        title="Liste 1"
        backOnClick={() => props.setScene("main")}
      />       
      <main>
        <ItemList 
          itemList={props.itemList}
          setItemList={props.setItemList}
          setScene={props.setScene}
          setCurrentItemDetails={props.setCurrentItemDetails}
          mode={"add"}
        />
      </main>
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
    </>
  )
}
