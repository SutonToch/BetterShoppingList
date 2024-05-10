import { SetStateAction, useState } from "react";
import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import NewItem from "./NewItem";

interface AddItemProps {
  itemList:Array<any>
  setItemList:React.Dispatch<SetStateAction<any>>
  setScene:React.Dispatch<React.SetStateAction<string>>
}

export default function AddItem(props:AddItemProps) {
  const [tab, setTab] = useState("Alt");

  return (
    <>
      {tab == "Alt" ?
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
            <button className="add-item-btn" style={{marginTop: "auto"}} onClick={() => setTab("Neu")}>
              +
            </button>
          </main>
        </> : ""  
      }
      {tab == "Neu" ?
        <NewItem 
          itemList={props.itemList}
          setItemList={props.setItemList}
          setTab={setTab}
        /> : ""  
      }
    </>
  )
}
