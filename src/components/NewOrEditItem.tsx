import { SetStateAction, useState } from "react";
import TitleRow from "./TitleRow";
import "./../styles/addItem.css"

interface NewItemProps {
    itemList:Array<any>
    setItemList:React.Dispatch<SetStateAction<any>>
    setScene:React.Dispatch<React.SetStateAction<string>>
    title:string
    edit: boolean
}

export default function NewItem(props:NewItemProps) {
    const [title, setTitle] = useState(props.title);

    function submitItemListChange(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(props.edit) {
          const newItemList = props.itemList.map((item) => {
            if(item.name !== props.title) {
              return item;
            }
            return {...item, name: title}
          })
          props.setItemList(newItemList)
          props.setScene("main")
        } else {
          const newItem = {done: false, name: title, onList: true}
          props.setItemList([...props.itemList, newItem])
          setTitle("")
        }
    }

  return (
    <>
        <TitleRow 
          title="Liste 1"
          backOnClick={() => props.setScene("main")}
        />       
        <form onSubmit={(e) => submitItemListChange(e)} className="add-item-form">
          <input 
            type="text"
            className="item-title"
            placeholder="Bezeichnung" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="submit" className="add-item-btn" value="->" />
        </form>
    </>
  )
}
