import {createContext, useState} from 'react';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        data: null,
        loading: true
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
                {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};