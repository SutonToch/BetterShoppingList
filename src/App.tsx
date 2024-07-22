
import { useEffect, useState } from 'react';
import ShoppingList from './components/ShoppingList.tsx';
import AddItem from './components/AddItem';
import NewOrEditItem from './components/NewOrEditItem.tsx';
import Authentication from './components/Authentication.tsx';
import { db } from './firebase.ts';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import './styles/App.css'

export interface itemType {
  done: boolean,
  name: string,
  onList: boolean
  doneAt: number
}

export const doneAtMax = 5000000000000 // roughly 80 years into the future

export default function App() {
  const [scene, setScene] = useState("auth");
  const [uid, setUid] = useState("")
  const [allItemList, setAllItemList] = useState([
    {done: false, name: "", onList: false, doneAt: doneAtMax}
  ])
  const [currentItemDetails, setCrrentItemDetails] = useState({
    edit: false,
    title: ""
  })
  let allItemCountOnStartup = 0;

  useEffect(() => {
    // get initial data from firebase and initialize itemList states
    if(uid) {
      const userCollection = collection(db, "users");
      
      const unsubscribe = onSnapshot(userCollection, (snapshot) => {
        const dataArr = snapshot.docs.map(doc => ({...doc.data()}))
        const allItems:itemType[] = dataArr.filter((doc) => {
          if(doc.uid == uid) {
            return true;
          }
        })[0].allItems
        
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

        updatedItemList.sort((a,b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          } else if(nameA > nameB) {
            return 1;
          }
          return 0;
        })

        allItemCountOnStartup = updatedItemList.length
        setAllItemList(updatedItemList)
    })
    return unsubscribe
    }
  }, [uid])

  useEffect(() => {
    if(uid) {
      const timeoutId = setTimeout(async () => {
        if(allItemList.length > 1 || allItemList.length > allItemCountOnStartup) {
          const docRef = doc(db, "users", uid)
          await setDoc(docRef, {allItems: allItemList}, {merge: true})
        } else {
          console.error("[WARNING] Atleast one item needs to remain in the list.")
        }
      }, 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [allItemList, uid])

  return (
    <div id="app">
      {scene == "auth" ?
        <Authentication 
          setScene={setScene}
          setUid={setUid}
        /> 
      : ""}
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
