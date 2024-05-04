import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";


const useWishlist = () => {
    const {wishlist, setWishlist} = useContext(WishlistContext);

    const addWishlist = (product) => {
        console.log(product);
        setWishlist(prev => [...prev, product]);
    }

    const removeWishlist = (productId) => {
        console.log('Remove Wishlist', productId);
        setWishlist(prev => prev.filter(item => item.id !== productId));
    }

    const updateWishlist = (productId, newProduct) => {
        setWishlist(prev => {
            let oldProduct = prev.find(item => item.id === productId);
            oldProduct = {...oldProduct, ...newProduct};

            const newItems = prev.map(item => item.id === productId ? oldProduct : item);

            return newItems;
        })
    }

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    }

    return {wishlist, addWishlist, removeWishlist, updateWishlist, isInWishlist};
}

export default useWishlist;