import React from 'react'

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
/*   const [valorDoSaldo, setValorDoSaldo] = useState(0); */
  
  return (
    <UserContext.Provider value={{usuario: 'Edu'}}>
        {children}
    </UserContext.Provider>
  )
}
