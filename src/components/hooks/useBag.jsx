import { useContext} from "react";
import { BagContext } from "../context/BagContext";


const useBag = () => {
    const {bag, setBag} = useContext(BagContext);

    const addToBag = (product) => {
        setBag(prev => {
            const newItems = [...prev.items, product];
            return {
                items: newItems,
                totalItems: newItems.length,
                totalPrice: newItems.reduce((total, item) => total + item.price, 0)
            }
        })
    }

    const removeFromBag = (productId) => {
        setBag(prev => {
            const newItems = prev.items.filter(item => item.id !== productId);
            return {
                items: newItems,
                totalItems: newItems.length,
                totalPrice: newItems.reduce((total, item) => total + item.price, 0)
            }
        })
    }

    const updateBag = (productId, newProduct) => {
        setBag(prev => {
            let oldProduct = prev.items.find(item => item.id === productId);
            oldProduct = {...oldProduct, ...newProduct};

            const newItems = prev.items.map(item => item.id === productId ? oldProduct : item);

            return {
                items: newItems,
                totalItems: newItems.length,
                totalPrice: newItems.reduce((total, item) => total + item.price, 0)
            }
        })
    }

    const isInBag = (productId) => {
        return bag.items.some(item => item.id === productId);
    }

    const clearBag = () => {
        setBag({
            items: [],
            totalItems: 0,
            totalPrice: 0
        })
    }

    return {bag, addToBag, removeFromBag, updateBag, isInBag, clearBag };
}

export default useBag;