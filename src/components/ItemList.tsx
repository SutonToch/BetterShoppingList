import { SetStateAction } from "react"

interface ItemListProps {
    itemList:Array<any>
    doneItemList:Array<any>
    setItemList:React.Dispatch<SetStateAction<any>>
    setDoneItemList:React.Dispatch<SetStateAction<any>>
}

export default function ItemList(props:ItemListProps) {
  const itemListElements = props.itemList.map((item) => {
    return (
        <div>
            <p>{item.name}</p>
            <div className="checkbox"/>
        </div>
    )
  })

  const doneItemListElements = props.doneItemList.map((item) => {
    return (
        <div>
            <p>{item.name}</p>
            <div className="checkbox-checked"/>
        </div>
    )
  })

  return (
    <>
        <div className="itemList">
            {itemListElements}
        </div>
        <div className="doneItemList">
            {doneItemListElements}
        </div>
    </>
  )
}
