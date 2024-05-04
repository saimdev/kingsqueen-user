import { createContext, useState } from "react"


const RedirectContext = createContext(null);

const RedirectProvider = ({children}) => {
    const [redirect, setRedirect] = useState(null);

    return (
        <RedirectContext.Provider value={{redirect, setRedirect}}>
            {children}
        </RedirectContext.Provider>
    )
}

export {RedirectContext, RedirectProvider}