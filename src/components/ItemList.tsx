import { SetStateAction } from "react"
import "./../styles/itemList.css"

interface ItemListProps {
    itemList:Array<any>
    setItemList:React.Dispatch<SetStateAction<any>>
    mode?:string
}

export default function ItemList(props:ItemListProps) {
  const itemList = props.itemList;
  let reducedItemList = []
  switch (props.mode) {
    case undefined: reducedItemList = 
      itemList.filter((item) => item.onList && !item.done)
      break;
    case "done": reducedItemList =
      itemList.filter((item) => item.onList && item.done)
      break;
    case "add": reducedItemList = 
      itemList.filter((item) => !item.onList)
      break;
  }

  const itemListElements = reducedItemList.map((item) => {
    return (
        <div key={item.name}>
            <p>{item.name}</p>
            {props.mode == undefined ?
              <div className="checkbox" 
                onClick={(e) => changeItemDone(e, true)} /> : ""
            }
            {props.mode == "done" ? 
              <div className="checkbox-checked" 
                onClick={(e) => changeItemDone(e, false)} /> : ""
            }
            {
              props.mode == "add" ?
              <button className="add-box"
                onClick={(e) => addToList(e)}>+</button> : ""
            }
        </div>
    )
  })

  function changeItemDone(e: any, targetDone: boolean) {
    const nameOfTickedItem = e.target.previousElementSibling.textContent;
    const newItemList = itemList.map((item) => {
      if(item.name !== nameOfTickedItem) {
        return item;
      }

      return {...item, done: targetDone}
    })
    props.setItemList(newItemList)
  }

  function addToList(e: any) {
    const nameOfAddedItem = e.target.previousElementSibling.textContent;
    const newItemList = itemList.map((item) => {
      if(item.name !== nameOfAddedItem) {
        return item;
      }

      return {...item, onList: true}
    })
    props.setItemList(newItemList)
  }

  return (
    <>
        <div className="itemList wrapper">
            {props.mode == "done" ? <p>zuletzt abgehakt</p> : ""}
            {itemListElements}
        </div>
    </>
  )
}
