import OrderDetailView from "@/components/ui/OrderDetailView";
import { useEffect, useState } from "react";


const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const response = await fetch(import.meta.env.VITE_API_URL + '/user-orders', {
            method: 'GET',
            credentials: 'include',
        });
        const result = await response.json();
        setOrders(result.data);
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div className="w-full">
            <ul className="flex justify-between border-b pb-2">
                <li className="w-2/5 uppercase font-bold">Order</li>
                <li className="w-1/5 uppercase font-bold">Date</li>
                <li className="w-1/5 uppercase font-bold">Status</li>
                <li className="w-2/5 uppercase font-bold">Total</li>
            </ul>
            <ul className="mt-6">
                {
                    orders.map((order, index) => (
                        <OrderDetailView order={order} key={index} />
                    ))
                }
            </ul>
        </div>
    )
}

export default Orders;