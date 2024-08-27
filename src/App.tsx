
import { useContext, useEffect, useState } from 'react';
import ShoppingList from './components/ShoppingList.tsx';
import AddItem from './components/AddItem';
import NewOrEditItem from './components/NewOrEditItem.tsx';
import Authentication from './components/Authentication.tsx';
import { db } from './firebase.ts';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import './styles/App.css'
import React from 'react';

export interface itemType {
  done: boolean,
  name: string,
  onList: boolean,
  doneAt: number,
  lists: string[]
}

interface itemDetailsType {
  edit: boolean;
  title: string;
}

interface AppContextType  {
  setScene: React.Dispatch<React.SetStateAction<string>>
  allItems: itemType[]
  setAllItems: React.Dispatch<React.SetStateAction<itemType[]>>
  setCurrentItemDetails: React.Dispatch<React.SetStateAction<itemDetailsType>>
  allListNames: string[]
  activeListName: string
}

export const doneAtMax = 5000000000000 // roughly 80 years into the future

const AppContext = React.createContext<AppContextType | null>(null);
export function useAppContext() {
  const currentAppContext = useContext(AppContext);

  if (!currentAppContext) {
    throw new Error(
      "currentAppContext has to be used within <AppContext.Provider>"
    );
  }

  return currentAppContext;
};

export default function App() {
  const [scene, setScene] = useState("auth");
  const [uid, setUid] = useState("")
  const [allItems, setAllItems] = useState([
    {done: false, name: "", onList: false, doneAt: doneAtMax, lists: [""]}
  ])
  const [currentItemDetails, setCurrentItemDetails] = useState({
    edit: false,
    title: ""
  })
  const [allListNames, setAllListNames] = useState(["Liste1"])
  const [activeListName, setActiveList] = useState("Liste1")
  let allItemCountOnStartup = 0;

  //runs every time the database is updated
  useEffect(() => {
    // get initial data from firebase and initialize itemList states
    if(uid) {
      const userCollection = collection(db, "users");
      
      const unsubscribe = onSnapshot(userCollection, (snapshot) => {
        const dataArr = snapshot.docs.map(doc => ({...doc.data()}))
        const userData = dataArr.filter((doc) => {
          if(doc.uid == uid) {
            return true;
          }
        })[0]
        const allItems:itemType[] = userData.allItems
        const allDatabaseLists:string[] = userData.allLists
        setAllListNames(allDatabaseLists)
        
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
        setAllItems(updatedItemList)
    })
    return unsubscribe
    }
  }, [uid])

  // UPDATE DATABASE
  useEffect(() => {
    if(uid) {
      const timeoutId = setTimeout(async () => {
        if(allItems.length > 1 || allItems.length > allItemCountOnStartup) {
          const docRef = doc(db, "users", uid)
          await setDoc(docRef, {allItems: allItems}, {merge: true})
        } else {
          console.error("[WARNING] Atleast one item needs to remain in the list.")
        }
      }, 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [allItems, uid])

  useEffect(() => {
    if(uid) {
      const timeoutId = setTimeout(async () => {
        const docRef = doc(db, "users", uid)
        await setDoc(docRef, {allLists: allListNames}, {merge: true})
      }, 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [allListNames, uid])

  return (
    <AppContext.Provider 
      value={{setScene, allItems, setAllItems, setCurrentItemDetails, allListNames, activeListName}}
    >
      <div id="app">
        {scene == "auth" ? <Authentication setUid={setUid} /> : ""}
        {scene == "main" ? 
          <ShoppingList 
            setAllListNames={setAllListNames} 
            setActiveList={setActiveList}
          /> 
        : ""}
        {scene == "addItem" ? <AddItem /> : ""}
        {scene == "newOrEditItem" ?
          <NewOrEditItem
            title={currentItemDetails.title}
            edit={currentItemDetails.edit}
          /> 
        : ""}
      </div>
    </AppContext.Provider>
  )
}
