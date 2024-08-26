
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
  allItemList: itemType[]
  setAllItemList: React.Dispatch<React.SetStateAction<itemType[]>>
  setCurrentItemDetails: React.Dispatch<React.SetStateAction<itemDetailsType>>
  activeList: string
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
  const [allItemList, setAllItemList] = useState([
    {done: false, name: "", onList: false, doneAt: doneAtMax, lists: [""]}
  ])
  const [currentItemDetails, setCurrentItemDetails] = useState({
    edit: false,
    title: ""
  })
  const [activeList, setActiveList] = useState("")
  let uniqueLists:string[] = []
  let allItemCountOnStartup = 0;

  //INITIAL SETUP
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
        
        //check and update done items + get lists
        const oneHourInMs = 3600000;
        const now = Date.now();
        let tempUniqueLists = new Set<string>();
        const updatedItemList = allItems.map((item) => {
          item.lists.forEach((list) => tempUniqueLists.add(list))

          if(now - item.doneAt > oneHourInMs) {
            return {...item, onList: false, done: false, doneAt: doneAtMax}
          } else {
            return item
          }
        })
        tempUniqueLists.forEach((value) => uniqueLists.push(value))
        setActiveList(uniqueLists[0])

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

  // UPDATE DATABASE
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

  function updateActiveList(newActiveList:string) {
    if(!uniqueLists.includes(newActiveList)) {
      console.error("Could not update active list because " + newActiveList + " is an unknown list.")
      return;
    }
    setActiveList(newActiveList)
  }

  return (
    <AppContext.Provider 
      value={{setScene, allItemList, setAllItemList, setCurrentItemDetails, activeList}}
    >
      <div id="app">
        {scene == "auth" ? <Authentication setUid={setUid} /> : ""}
        {scene == "main" ? <ShoppingList /> : ""}
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
