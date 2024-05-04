import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { PageTitle } from "../ui";


const CustomerService = () => {

    const customerServiceMenus = [
        { id: 1, href: "/contact-us", text: "Contact Us" },
        { id: 2, href: "/track-order", text: "Track Your Order" },
        { id: 3, href: "/return-order", text: "Return Your Order" },
        { id: 4, href: "/shipping-returns", text: "Shipping & Returns" },
        { id: 5, href: "/order-payment", text: "Orders & Payments" },
        { id: 6, href: "/term-condition", text: "Terms & Conditions" },
        { id: 7, href: "/privacy-policy", text: "Privacy Policy" },
        { id: 8, href: "/cookie-policy", text: "Cookie Policy" },
        { id: 9, href: "/cookie-preferences", text: "Cookie Preferences" },
        { id: 10, href: "/dop", text: "DPO" },
        { id: 11, href: "/eyewear-certificates", text: "Eyewear Certificates" },
        { id: 12, href: "/faqs", text: "FAQs" },
    ];

    const [activeMenu, setActiveMenu] = useState('');
    const location = useLocation();

    const path = location.pathname.split('/').pop();

    useEffect(()=>{
        console.log(path)
        setActiveMenu('/' + path)
    }, [])

    const menuClickHander = (event)=>{
        setActiveMenu(event.target.dataset.path)
        console.log(activeMenu)
    }

    return (
        <>
            <PageTitle>Customer Service</PageTitle>
            <div className="pageContent flex justify-between py-10">
                <div className="w-1/3">
                    <nav className="flex flex-col gap-4 px-2">
                        {
                            customerServiceMenus.map(item => {
                                return <NavLink onClick={menuClickHander} data-path={item.href} className={`text-xl font-bold hover:text-primary ${activeMenu === item.href ? 'text-primary' : ''}`} key={item.id} to={'/customer-service' + item.href}>{item.text}</NavLink>
                            })
                        }
                    </nav>
                </div>
                <div className="w-2/3">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default CustomerService