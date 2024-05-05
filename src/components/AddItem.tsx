import { SetStateAction } from "react";
import ItemList from "./ItemList";
import TitleRow from "./TitleRow";

interface AddItemProps {
  allItems:Array<any>
  setItemList:React.Dispatch<SetStateAction<any>>
  setScene:React.Dispatch<React.SetStateAction<string>>
}

export default function AddItem(props:AddItemProps) {
  const reducedItemList = props.allItems.filter((item) => !item.onList)

  return (
    <>
      <TitleRow 
        title="Liste 1"
        backOnClick={() => props.setScene("main")}
      />
      <main>
        <ItemList 
          itemList={reducedItemList}
          setItemList={props.setItemList}
          mode={"add"}
        />
      </main>
      <div className="list-selection">
          <div>Alt</div>
          <div>Neu</div>
      </div>
    </>
  )
}
