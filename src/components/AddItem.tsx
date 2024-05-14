import { SetStateAction } from "react";
import ItemList from "./ItemList";
import TitleRow from "./TitleRow";

interface AddItemProps {
  itemList:Array<any>
  setItemList:React.Dispatch<SetStateAction<any>>
  setScene:React.Dispatch<React.SetStateAction<string>>
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
          mode={"add"}
        />
        <button className="add-item-btn" style={{marginTop: "auto"}} onClick={() => props.setScene("newOrEditItem")}>
          +
        </button>
      </main>
    </>
  )
}
