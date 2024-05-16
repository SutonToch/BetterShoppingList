
import { useEffect, useState } from 'react';
import ShoppingList from './components/ShoppingList.tsx';
import AddItem from './components/AddItem';
import NewOrEditItem from './components/NewOrEditItem.tsx';
import { usersCollection, db } from './firebase.ts';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import './styles/App.css'

interface itemType {
  done: boolean,
  name: string,
  onList: boolean
  doneAt: number
}

export const doneAtMax = 5000000000000 // roughly 80 years into the future

export default function App() {
  const [scene, setScene] = useState("main");
  const [allItemList, setAllItemList] = useState([
    {done: false, name: "", onList: false, doneAt: doneAtMax}
  ])
  const [currentItemDetails, setCrrentItemDetails] = useState({
    edit: false,
    title: ""
  })

  useEffect(() => {
    // get initial data from firebase and initialize itemList states
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const dataArr = snapshot.docs.map(doc => ({...doc.data()}))
      const allItems:itemType[] = dataArr[0].allItems
      
      //check and update done items
      const oneHourInMs = 3600000;
      const now = Date.now();
      const updatedItemList = allItems.map((item) => {
        if(now - item.doneAt > oneHourInMs) {
          return {...item, onList: false, done: false, doneAt: doneAtMax}
        } else {
          return item
        }
      })

      setAllItemList(updatedItemList)
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
        <ShoppingList 
          allItemList={allItemList}
          setAllItemList={setAllItemList}
          setScene={setScene}
          setCurrentItemDetails={setCrrentItemDetails}
        />
      : ""}
      {scene == "addItem" ? 
        <AddItem 
          itemList={allItemList}
          setItemList={setAllItemList}
          setScene={setScene}
          setCurrentItemDetails={setCrrentItemDetails}
        /> 
      : ""}
      {scene == "newOrEditItem" ?
        <NewOrEditItem 
          itemList={allItemList}
          setItemList={setAllItemList}
          setScene={setScene}
          title={currentItemDetails.title}
          edit={currentItemDetails.edit}
        /> 
      : ""}
    </div>
  )
}
