
import { useEffect, useState } from 'react';
import ItemList from './components/ItemList'
import AddItem from './components/AddItem';
import TitleRow from './components/TitleRow';
import { usersCollection } from './firebase.ts';
import { onSnapshot } from 'firebase/firestore';
import './styles/App.css'

interface itemType {
  done: boolean,
  name: string,
  onList: boolean
}

export default function App() {
  const [scene, setScene] = useState("main");
  const [allItemList, setAllItemList] = useState([])

  // get initial data from firebase and initialize itemList states
  useEffect(() => {
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const dataArr = snapshot.docs.map(doc => ({...doc.data()}))
      const allItems = dataArr[0].allItems
      setAllItemList(allItems)
    })
    return unsubscribe
  }, [])

  // useEffect to get all the data and store it
  // it's not enough to be a huge burden
  // and this way a minimal amount of database requests can be ensured

  return (
    <div id="app">
      {scene == "main" ? 
        <>
          <TitleRow 
            title="Liste 1"
          />
          <main>
            <ItemList
              itemList={allItemList}
              setItemList={setAllItemList}
            />
            <ItemList 
              itemList={allItemList}
              setItemList={setAllItemList}
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
          setItemList={setAllItemList}
          setScene={setScene}
        /> : ""
      }
    </div>
  )
}
