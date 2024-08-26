import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import { Plus } from "./Icons";
import { useAppContext } from "../App";



export default function ShoppingList() {
  const {allItemList, setScene, activeList} = useAppContext()
  const onListNotDoneCount = allItemList.filter(item => item.onList && !item.done).length;
  return (
    <>
      <TitleRow title={activeList} />
      <main>
        <ItemList />
        <ItemList mode={"done"} />
      </main>
      <div className="control-bar wrapper">
        <button className="add-item-btn" onClick={() => setScene("addItem")}>
          <Plus size={40}/>
        </button>
      </div>
      <div className="list-selection">
        <div className="list-selection-item active">{activeList} ({onListNotDoneCount})</div>
        
      </div>
    </>
  )
}
