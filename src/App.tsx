
import { useState } from 'react';
import ItemList from './components/ItemList'
import AddItem from './components/AddItem';
import './styles/App.css'

export default function App() {
  const [scene, setScene] = useState("main");
  const allItemList = [
    {
      name: "(1) Kartoffeln",
    },
    {
      name: "(1) Zwiebeln",
    },
    {
      name: "(2) Saft",
    },
    {
      name: "(3) Salzbrezeln",
    }
  ]
  const [itemList, setItemList] = useState([
    {
      name: "(1) Kartoffeln",
    },
    {
      name: "(2) Saft",
    }
  ]);
  const [doneItemList, setDoneItemList] = useState([
    {
      name: "(1) Zwiebeln",
    }
  ]);

  // useEffect to get all the data and store it
  // it's not enough to be a huge burden
  // and this way a minimal amount of database requests can be ensured

  return (
    <div id="app">
      {scene == "main" ? 
        <>
          <div className="title-row">
            <h1 className="title">Liste 1</h1>
            <button className="settings-btn">
              s {/*to be replaced with an image*/}
            </button>
          </div>
          <main>
            <ItemList
              itemList={itemList}
              doneItemList={doneItemList}
              setItemList={setItemList}
              setDoneItemList={setDoneItemList}
            />
            <ItemList 
              itemList={itemList}
              doneItemList={doneItemList}
              setItemList={setItemList}
              setDoneItemList={setDoneItemList}
              mode={"done"}
            />
            <div className="control-bar wrapper">
              <button className="add-item-btn" onClick={() => setScene("addItem")}>
                +
              </button>
            </div>
          </main>
          <div className="list-selection">
            Liste 1
          </div>
        </> 
      : ""}
      {scene == "addItem" ? 
        <AddItem 
          allItems={allItemList}
          itemList={itemList}
          setItemList={setItemList}
          setScene={setScene}
        /> : ""
      }
    </div>
  )
}
