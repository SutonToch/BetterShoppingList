
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
}

export default function App() {
  const [scene, setScene] = useState("main");
  const [allItemList, setAllItemList] = useState([])
  const [currentItemDetails, setCrrentItemDetails] = useState({
    edit: false,
    title: ""
  })

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
