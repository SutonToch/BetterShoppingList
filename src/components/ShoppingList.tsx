import ItemList from "./ItemList";
import TitleRow from "./TitleRow";
import { Plus } from "./Icons";
import { useAppContext } from "../App";



export default function ShoppingList() {
  const {allItemList, setScene} = useAppContext()
  const onListNotDoneCount = allItemList.filter(item => item.onList && !item.done).length;
  return (
    <>
      <TitleRow title="Liste 1" />
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
        <div className="list-selection-item active">Liste 1 ({onListNotDoneCount})</div>
        
      </div>
    </>
  )
}
