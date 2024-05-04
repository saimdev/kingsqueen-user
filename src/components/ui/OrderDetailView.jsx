import { useEffect, useState } from "react";
import { Button } from ".";


const OrderDetailView = ({ order }) => {
    const [detailViewData, setDetailViewData] = useState({});
    const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState('');

    const handleViewClick = (event) => {
        const orderId = event.target.dataset.id;
        setDetailViewData(order);
        setIsDetailViewOpen(prev => !prev);
    }

    useEffect(()=>{
        const fetchPaymentUrl = async () => {
            const response = await fetch(import.meta.env.VITE_API_URL + '/pending-payment/' + order._id, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            console.log('Pending Payment', result)
            setPaymentUrl(result.data.paymentUrl);
        }

        if(order.orderStatus === 'Pending Payment'){
            fetchPaymentUrl();
        }
    }, [])

    return (
        <li className="my-4">
            <section className="flex justify-between items-center">
                <div className="w-2/5">{order.orderNumber}</div>
                <div className="w-1/5">{order.createdAt.split('T')[0]}</div>
                <div className="w-1/5">
                    {order.orderStatus}<br/>
                    {
                        order.orderStatus === 'Pending Payment' && (
                            <a href={paymentUrl} target="_blank" className="text-primary">Make Payment</a>
                        )
                    }
                </div>
                <div className="w-1/5">${order.totalAmount}</div>
                <div className="w-1/5">
                    <Button data-id={order._id} onClick={handleViewClick}>{isDetailViewOpen ? 'Close' : 'View'}</Button>
                </div>
            </section>
            <div className={`bg-bgGray py-6 px-4 ${isDetailViewOpen ? '' : 'hidden'}`}>
                <h1 className="font-bold mb-4">Order Items</h1>
                <div className="flex justify-between">
                    <div className="font-bold">Image</div>
                    <div className="w-2/5 font-bold">Name</div>
                    <div className="w-1/5 font-bold">Price</div>
                    <div className="w-1/5 font-bold">Qty</div>
                </div>
                {
                    detailViewData?.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b py-2">
                            <div className="">
                                <img src={import.meta.env.VITE_API_URL + '/images/products/' + item.image} alt={item.name} className="w-10" />
                            </div>
                            <div className="w-2/5">{item.title}</div>
                            <div className="w-1/5">${item.price}</div>
                            <div className="w-1/5">{item.qty}</div>
                        </div>

                    ))
                }
            </div>
        </li>
    )
}

export default OrderDetailView;