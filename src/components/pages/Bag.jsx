import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBag from "../hooks/useBag"
import { Button, PageTitle } from "../ui"
import { X } from 'react-bootstrap-icons'
import useRedirect from "../hooks/useRedirect";


const Bag = () => {
    const { bag, removeFromBag, updateBag } = useBag();
    const auth = useAuth();
    const navigate = useNavigate();
    const redirect = useRedirect();

    const handleRemoveClick = (event) => {
        const productId = event.currentTarget.dataset.id;
        console.log(productId);
        removeFromBag(productId);
    }

    const handleSizeChange = (event) => {
        const productId = event.target.dataset.id;
        const newSize = event.target.value;
        
        console.log(productId, newSize)
        updateBag(productId, {selectedSize: newSize});
    }

    const handleColorChange = (event) => {
        const productId = event.target.dataset.id;
        const newColor = event.target.value;
       
        updateBag(productId, {selectedColor: newColor});
    }

    const handleQtyChange = (event) => {
        const productId = event.target.dataset.id;
        const newQty = event.target.value;
        
        updateBag(productId, {qty: newQty});
    }

    const handleCheckoutClick = () => {
        if(auth.isAuthenticated()){
            navigate('/checkout');
            return;
        }

        redirect.setRedirectPath('/checkout');
        navigate('/login');
    }

    return (
        <>
            <PageTitle>Shopping Bag</PageTitle>

            <div className="flex py-10">
                <div className="w-2/3 px-10">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-start text-sm font-bold py-4 px-2">ITEM</th>
                                <th className="text-start text-sm font-bold py-4 px-2">SIZE</th>
                                <th className="text-start text-sm font-bold py-4 px-2">COLOR</th>
                                <th className="text-start text-sm font-bold py-4 px-2">QTY</th>
                                <th className="text-start text-sm font-bold py-4 px-2">PRICE</th>
                            </tr>
                        </thead>
                        <tbody className="border-y">
                            {
                                bag.items.length > 0 ? bag.items.map((item, index) => (
                                    <tr key={index} >
                                        <td className="py-4 px-2">
                                            <div className="flex items-center gap-4">
                                                <div className="w-[80px] h-auto">
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
                                                {
                                                    item.sizes?.map(size => (
                                                        <option key={size} value={size}>{size}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="py-4 px-2">
                                            <select data-id={item.id} onChange={handleColorChange} className="py-2 px-6 bg-bgGray outline-none" value={item.selectedColor}>
                                                {
                                                    item.colors?.map(color => (
                                                        <option key={color} value={color}>{color}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="py-4 px-2">
                                            <select data-id={item.id} onChange={handleQtyChange} value={item.qty} className="py-2 px-6 bg-bgGray outline-none">
                                                {
                                                    [...Array(item.stock)].map((_, i) => (
                                                        <option key={i+1} value={i + 1}>{i + 1}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="py-4 px-2">${item.price}</td>
                                        <td className="py-4 ps-4"><X onClick={handleRemoveClick} data-id={item.id} className="text-3xl cursor-pointer" /></td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="py-6 text-center"><p>Bag is Empty.</p></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="w-1/3 px-10">
                    <div className="px-10 py-4 bg-bgGray">
                        <h3 className="uppercase font-bold text-xl text-center mb-4">Summary</h3>
                        <div className="flex justify-between items-center py-2">
                            <p className="text-sm uppercase">Subtotal</p>
                            <p className="text-sm">${bag.totalPrice}</p>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <p className="text-sm uppercase">Shipping</p>
                            <p className="text-sm uppercase">Free</p>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <p className="text-xl uppercase font-bold">Total</p>
                            <p className="text-xl font-bold">${bag.totalPrice}</p>
                        </div>
                        <div className="py-4">
                            <Button dark onClick={handleCheckoutClick}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Bag