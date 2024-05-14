import { SetStateAction } from "react";
import ItemList from "./ItemList";
import TitleRow from "./TitleRow";

interface ShoppingListProps {
    allItemList:Array<any>
    setAllItemList:React.Dispatch<SetStateAction<any>>
    setScene:React.Dispatch<React.SetStateAction<string>>
    setCurrentItemDetails:React.Dispatch<React.SetStateAction<{
      edit: boolean;
      title: string;
    }>>
}

export default function ShoppingList(props: ShoppingListProps) {
  return (
    <>
      <TitleRow 
        title="Liste 1"
      />
      <main>
        <ItemList
          itemList={props.allItemList}
          setItemList={props.setAllItemList}
          setScene={props.setScene}
          setCurrentItemDetails={props.setCurrentItemDetails}
        />
        <ItemList 
          itemList={props.allItemList}
          setItemList={props.setAllItemList}
          setScene={props.setScene}
          setCurrentItemDetails={props.setCurrentItemDetails}
          mode={"done"}
        />
        <div className="control-bar wrapper">
          <button className="add-item-btn" onClick={() => props.setScene("addItem")}>
            +
          </button>
        </div>
      </main>
      <div className="list-selection">
        <div className="list-selection-item active">Liste 1</div>
        
      </div>
    </>
  )
}
