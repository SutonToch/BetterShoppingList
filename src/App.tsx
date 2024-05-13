
import { useEffect, useState } from 'react';
import ItemList from './components/ItemList'
import AddItem from './components/AddItem';
import TitleRow from './components/TitleRow';
import { usersCollection, db } from './firebase.ts';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import './styles/App.css'

interface itemType {
  done: boolean,
  name: string,
  onList: boolean
}

export default function App() {
  const [scene, setScene] = useState("main");
  const [allItemList, setAllItemList] = useState([])

  useEffect(() => {
    // get initial data from firebase and initialize itemList states
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const dataArr = snapshot.docs.map(doc => ({...doc.data()}))
      const allItems = dataArr[0].allItems
      setAllItemList(allItems)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const docRef = doc(db, "users", "user1")
      await setDoc(docRef, {allItems: allItemList}, {merge: true})
    }, 3000)
    return () => clearTimeout(timeoutId)
  }, [allItemList])

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
            <div className="list-selection-item active">Liste 1</div>
            
          </div>
        </> 
      : ""}
      {scene == "addItem" ? 
        <AddItem 
          itemList={allItemList}
          setItemList={setAllItemList}
          setScene={setScene}
        /> : ""
      }
    </div>
  )
}
