import { useState } from "react";
import { Button, PageTitle } from "../ui";
import Input from "../ui/FormControls/Input";
import useBag from "../hooks/useBag";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Checkout = () => {
    const [shippingFrom, setShippingFrom] = useState({});
    const {bag, clearBag} = useBag();
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleShippingFormSubmit = async (e) => {
        e.preventDefault();

        setCheckoutLoading(true);
        const formData = new FormData(e.target);
        const shippingAddress = Object.fromEntries(formData.entries());

        const response = await fetch(import.meta.env.VITE_API_URL + '/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shippingAddress,
                products: bag.items
            }),
            credentials: 'include'
        });
        
        if(response.status === 200) {
            const {session_url} = await response.json();

            // Clear Bag
            clearBag();

            setCheckoutLoading(false);
            window.location.href = session_url;
        }else{
            toast.error('Something went wrong! Contact with support.');
            setCheckoutLoading(false);
        }
    }

    return (
        <>
            <PageTitle>Checkout</PageTitle>

            <div className="flex py-10">
                <div className="w-2/3 px-4">
                    <form onSubmit={handleShippingFormSubmit}>
                        <div className="flex my-4">
                            <div className="w-1/2 px-4">
                                <label className="text-base uppercase" htmlFor="country">Country</label><br />
                                <select name="country" id="country" className="bg-bgGray px-2 py-2.5 w-full outline-none mt-2">
                                    <option value="bangladesh">Bangladesh</option>
                                    <option value="usa">USA</option>
                                </select>
                            </div>
                            <div className="w-1/2 px-4">
                                <Input label={'First Name'} id={'f_name'} name={'f_name'} required />
                            </div>
                        </div>

                        <div className="flex my-4">
                            <div className="w-1/2 px-4">
                                <Input label={'Last Name'} id={'l_name'} name={'l_name'} required />
                            </div>
                            <div className="w-1/2 px-4">
                                <Input label={'STREET ADDRESS 1'} id={'street_1'} name={'street_1'} required />
                            </div>
                        </div>

                        <div className="flex my-4">
                            <div className="w-1/2 px-4">
                                <Input label={'Street Address 2 (Optional)'} id={'street_2'} name={'street_2'} />
                            </div>
                            <div className="w-1/2 px-4">
                                <Input label={'Phone'} id={'phone'} name={'phone'} required />
                            </div>
                        </div>

                        <div className="flex my-4">
                            <div className="w-1/2 px-4">
                                <Input label={'City'} id={'city'} name={'city'} required />
                            </div>
                            <div className="w-1/2 px-4">
                                <Input label={'State (Optional)'} id={'state'} name={'state'} />
                            </div>
                        </div>

                        <div className="flex my-4">
                            <div className="w-1/2 px-4">
                                <Input label={'Zip'} id={'zip'} name={'zip'} required />
                            </div>
                            <div className="w-1/2 px-4">
                                <label className="text-base uppercase" htmlFor="shipping_method">Shipping Method</label><br />
                                <input value={'dhl_express'} type="radio" name="shipping_method" id="dhl_express" />
                                <label className="ms-2" htmlFor="dhl_express">DHL Express</label>
                                <br />
                                <input value={'another_express'} type="radio" name="shipping_method" id="another_express" />
                                <label className="ms-2" htmlFor="another_express">Another Express</label>

                                <Button loading={checkoutLoading} buttonClass={"mt-10"} type="submit" dark>Place Order</Button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="w-1/3">
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout;