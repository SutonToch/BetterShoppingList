import { SetStateAction } from "react"
import "./../styles/itemList.css"

interface ItemListProps {
    itemList:Array<any>
    doneItemList?:Array<any>
    setItemList:React.Dispatch<SetStateAction<any>>
    setDoneItemList?:React.Dispatch<SetStateAction<any>>
    mode?:string
}

export default function ItemList(props:ItemListProps) {
  let currentItemList = props.mode == "done" ? props.doneItemList : props.itemList
  if(!currentItemList) {currentItemList = props.itemList}
  
  const itemListElements = currentItemList.map((item) => {
    return (
        <div key={item.name}>
            <p>{item.name}</p>
            {props.mode == undefined ?
              <div className="checkbox" onClick={(e) => tickItem(e)} /> : ""
            }
            {props.mode == "done" ? 
              <div className="checkbox-checked" onClick={(e) => untickItem(e)} /> : ""
            }
            {
              props.mode == "add" ?
              <button className="add-box">+</button> : ""
            }
        </div>
    )
  })

  function tickItem(e: any) {
    if(!props.doneItemList || !props.setDoneItemList) {return}

    const newItemList = props.itemList.filter(
      (item) => item.name !== e.target.previousElementSibling.textContent
    )
    if(newItemList.length > 0) {
      props.setItemList(newItemList)
    } else {
      props.setItemList([])
    }

    props.setDoneItemList([
      ...props.doneItemList, 
      {name: e.target.previousElementSibling.textContent}
    ])
  }

  function untickItem(e: any) {
    if(!props.doneItemList || !props.setDoneItemList) {return}

    props.setItemList([
      ...props.itemList, 
      {name: e.target.previousElementSibling.textContent}
    ])

    const newDoneItemList = props.doneItemList.filter(
      (item) => item.name !== e.target.previousElementSibling.textContent
    )
    if(newDoneItemList.length > 0) {
      props.setDoneItemList(newDoneItemList)
    } else {
      props.setDoneItemList([])
    }
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
