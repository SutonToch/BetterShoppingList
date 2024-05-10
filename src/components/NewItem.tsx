import { SetStateAction, useState } from "react";
import TitleRow from "./TitleRow";
import "./../styles/addItem.css"

interface NewItemProps {
    itemList:Array<any>
    setItemList:React.Dispatch<SetStateAction<any>>
    setTab:React.Dispatch<React.SetStateAction<string>>
}

export default function NewItem(props:NewItemProps) {
    const [bezeichnung, setBezeichnung] = useState("");

    function submitItemListChange(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const newItem = {done: false, name: bezeichnung, onList: true}
        props.setItemList([...props.itemList, newItem])
        setBezeichnung("")
    }

  return (
    <>
        <TitleRow 
          title="Liste 1"
          backOnClick={() => props.setTab("Alt")}
        />       
        <form onSubmit={(e) => submitItemListChange(e)} className="add-item-form">
          <input 
            type="text"
            className="bezeichnung"
            placeholder="Bezeichnung" 
            value={bezeichnung} 
            onChange={(e) => setBezeichnung(e.target.value)}
          />
          <input type="submit" className="add-item-btn" value="->" />
        </form>
    </>
  )
}
