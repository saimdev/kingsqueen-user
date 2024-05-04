import { createContext,useState, useEffect } from "react";


const BagContext = createContext(null);

const BagProvider = ({children}) => {
    let localBag = localStorage.getItem('bag');
    if (localBag) {
        localBag = JSON.parse(localBag);
    }

    const [bag, setBag] = useState(localBag || {
        items: [],
        totalItems: 0,
        totalPrice: 0
    
    });

    useEffect(() => {
        localStorage.setItem('bag', JSON.stringify(bag));
    }, [bag])

    return (
        <BagContext.Provider value={{bag, setBag}}>
            {children}
        </BagContext.Provider>
    )
}

export {BagContext, BagProvider}