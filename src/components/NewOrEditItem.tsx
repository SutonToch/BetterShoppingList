import { useState } from "react";
import TitleRow from "./TitleRow";
import "./../styles/addItem.css"
import ArrowRight from "./../assets/icons/arrow-right.svg";
import { doneAtMax, useAppContext } from "../App";

interface NewItemProps {
    title:string
    edit: boolean
}

export default function NewItem(props:NewItemProps) {
    const [title, setTitle] = useState(props.title);
    const {allItemList, setAllItemList, setScene} = useAppContext()

    function submitItemListChange(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(title == "") {
          return;
        }

        if(props.edit) {
          const newItemList = allItemList.map((item) => {
            if(item.name !== props.title) {
              return item;
            }
            return {...item, name: title}
          })
          setAllItemList(newItemList)
          setScene("main")
        } else {
          const newItem = {done: false, name: title, onList: true, doneAt: doneAtMax}
          setAllItemList([...allItemList, newItem])
          setTitle("")
        }
    }

  return (
    <>
        <TitleRow
          title="Liste 1"
          backOnClick={() => setScene("main")}
        />       
        <form onSubmit={(e) => submitItemListChange(e)} className="add-item-form">
          <input 
            type="text"
            className="item-title"
            placeholder="Bezeichnung" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="image" className="add-item-btn" alt="submit" src={ArrowRight} />
        </form>
    </>
  )
}
