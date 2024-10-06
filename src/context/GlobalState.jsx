import  { createContext, useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';


export const GlobalContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function GlobalState({children}) {

    // when the auth lister is triggerd, it will fetch the relevant user document from users collection 
    // and then store the info in the currentUser, which is accessable througthout the applicaiton


    const [timeData, setTimeData] = useState([]); 
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();  

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => { // this will trigger whenever  a new login/logout happens
          if (user) { 
            //console.log(user)
            // Fetch the user data from Firestore to get the user data such as name
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              setCurrentUser({ uid: user.uid, ...userDoc.data() });
            }
          } else {
            console.log('could not find the user')
            setCurrentUser(null); // User is signed out
          }
          console.log('from auth state')
        });
        //console.log('useeffect')
        // Clean up the listener on unmount
        return () => unsubscribe();
        
      }, [auth]);
    
      console.log(currentUser)  
    
    return (
        <GlobalContext.Provider
          value={{
              timeData,
              setTimeData,
              currentUser 
          }}>
              {children}
        </GlobalContext.Provider>
    )
}