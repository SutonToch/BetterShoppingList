import { SetStateAction } from "react"
import "./../styles/itemList.css"

interface ItemListProps {
    itemList:Array<any>
    setItemList:React.Dispatch<SetStateAction<any>>
    setDoneItemList?:React.Dispatch<SetStateAction<any>>
    mode?:string
}

export default function ItemList(props:ItemListProps) {
  const itemListElements = props.itemList.map((item) => {
    return (
        <div key={item.name}>
            <p>{item.name}</p>
            {props.mode == undefined ?
              <div className="checkbox"/> : ""
            }
            {props.mode == "done" ? 
              <div className="checkbox-checked"/> : ""
            }
            {
              props.mode == "add" ?
              <button className="add-box">+</button> : ""
            }
        </div>
    )
  })

  return (
    <>
        <div className="itemList wrapper">
            {props.mode == "done" ? <p>zuletzt abgehakt</p> : ""}
            {itemListElements}
        </div>
    </>
  )
}
