import { createContext, useState, useEffect } from "react";


const WishlistContext = createContext([]);

const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(()=>{
        const localWishlist = localStorage.getItem('wishlist');
        if (localWishlist) {
            setWishlist(JSON.parse(localWishlist));
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist])

    return (
        <WishlistContext.Provider value={{wishlist, setWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}

export {WishlistContext, WishlistProvider};