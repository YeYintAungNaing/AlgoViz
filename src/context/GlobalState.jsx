import  { createContext, useState } from 'react'


export const GlobalContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function GlobalState({children}) {

    const [timeData, setTimeData] = useState([]);   
    
        
    
    return (
        <GlobalContext.Provider
          value={{
              timeData,
              setTimeData 
          }}>
              {children}
        </GlobalContext.Provider>
    )
}