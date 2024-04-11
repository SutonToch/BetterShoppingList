import { SetStateAction } from "react";
import ItemList from "./ItemList";

interface AddItemProps {
  allItems:Array<any>
  itemList:Array<any>
  setItemList:React.Dispatch<SetStateAction<any>>
  setScene:React.Dispatch<React.SetStateAction<string>>
}

export default function AddItem(props:AddItemProps) {

  // everything from allItems that is not in itemList
  const reducedItemList = props.allItems.filter((itemFromAll) => {
    return(!props.itemList.map(item => item.name).includes(itemFromAll.name))
  })

  return (
    <>
      <div className="title-row">
          <button className="back-btn" onClick={() => props.setScene("main")}>
            {"<-"}
          </button>
          <h1 className="title">Liste 1</h1>
          <button className="settings-btn">
            s {/*to be replaced with an image*/}
          </button>
      </div>
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
