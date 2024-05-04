import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBag from "../hooks/useBag"
import { Button, PageTitle } from "../ui"
import { X } from 'react-bootstrap-icons'
import useRedirect from "../hooks/useRedirect";
import useWishlist from "../hooks/useWishlist";
import { toast } from "react-toastify";


const Wishlist = () => {
    const { wishlist, removeWishlist, updateWishlist } = useWishlist();
    const {addToBag} = useBag();
    const auth = useAuth();
    const navigate = useNavigate();
    const redirect = useRedirect();

    const handleRemoveClick = (event) => {
        const productId = event.currentTarget.dataset.id;
        removeWishlist(productId);
    }

    const handleSizeChange = (event) => {
        const productId = event.target.dataset.id;
        const newSize = event.target.value;
        
        console.log(productId, newSize)
        updateWishlist(productId, {selectedSize: newSize});
    }

    const handleColorChange = (event) => {
        const productId = event.target.dataset.id;
        const newColor = event.target.value;
       
        updateWishlist(productId, {selectedColor: newColor});
    }

    const handleAddToBag = (event) => {
        const productId = event.currentTarget.dataset.id;
        const product = wishlist.find(item => item.id === productId);

        if(!product.selectedSize || !product.selectedColor){
            toast.error('Please select size and color');
            return;
        }

        product.qty = 1;
        addToBag(product);
        removeWishlist(productId);
    }

    return (
        <>
            <PageTitle>Your Wishlist</PageTitle>

            <div className="py-10">
                <div className="px-10 w-2/3 max-lg:w-full m-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-start text-sm font-bold py-4 px-2">ITEM</th>
                                <th className="text-start text-sm font-bold py-4 px-2">SIZE</th>
                                <th className="text-start text-sm font-bold py-4 px-2">COLOR</th>
                                <th className="text-start text-sm font-bold py-4 px-2">PRICE</th>
                            </tr>
                        </thead>
                        <tbody className="border-y">
                            {
                                wishlist.length > 0 ? wishlist.map((item, index) => (
                                    <tr key={index} >
                                        <td className="py-4 px-2">
                                            <div className="flex items-center gap-4">
                                                <div className="w-[100px] h-auto">
                                                    <img className="object-cover" src={import.meta.env.VITE_API_URL + '/images/products/' + item.image} alt="item" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm uppercase font-bold">{item.title}</h3>
                                                    <p className="uppercase text-sm">{item.color}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <select data-id={item.id} onChange={handleSizeChange} className="py-2 px-6 bg-bgGray outline-none" value={item.selectedSize}>
                                                <option value="">Select Size</option>
                                                {
                                                    item.sizes?.map(size => (
                                                        <option key={size} value={size}>{size}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="py-4 px-2">
                                            <select data-id={item.id} onChange={handleColorChange} className="py-2 px-6 bg-bgGray outline-none" value={item.selectedColor}>
                                                <option value="">Select Color</option>
                                                {
                                                    item.colors?.map(color => (
                                                        <option key={color} value={color}>{color}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="py-4 px-2">${item.price}</td>
                                        <td className="py-4 px-2">
                                            <Button data-id={item.id} onClick={handleAddToBag} dark>Add To Bag</Button>
                                        </td>
                                        <td className="py-4 ps-4"><X onClick={handleRemoveClick} data-id={item.id} className="text-3xl cursor-pointer" /></td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="py-6 text-center"><p>Wishlist is Empty.</p></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Wishlist