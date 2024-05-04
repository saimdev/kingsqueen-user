import { UserContext } from "@/components/context/UserContext";
import { Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "@/components/hooks/useAuth";


const Account = () => {
    const accountMenu = [
        { id: 1, href: "/account-details", text: "Account Details" },
        { id: 2, href: "/orders", text: "Orders" },
        { id: 3, href: "/change-password", text: "Change Password" }
    ];

    const [activeMenu, setActiveMenu] = useState('');
    const location = useLocation();
    const auth = useAuth();
    const navigate = useNavigate();

    const path = location.pathname.split('/').pop();

    useEffect(() => {
        console.log(path)
        setActiveMenu('/' + path)
    }, [location])

    const menuClickHander = (event) => {
        setActiveMenu(event.target.dataset.path)
    }

    const handleLogout = ()=>{
        fetch(import.meta.env.VITE_API_URL + '/logout', {
            method: 'POST',
            credentials: 'include',
        })
        .then(res => {
            if(res.ok){
                auth.logout();
                navigate('/login');
            }
        })
    }

    return (
        <>
            <div className="customerServiceHeader flex justify-between py-2 pageContent border-b">
                <h1 className="uppercase font-semibold text-lg">Account</h1>
            </div>

            <div className="pageContent flex justify-between py-10">
                <div className="w-1/3">
                    <nav className="flex flex-col gap-4 px-2">
                        {
                            accountMenu.map(item => {
                                return <NavLink onClick={menuClickHander} data-path={item.href} className={`text-xl font-bold hover:text-primary ${activeMenu === item.href ? 'text-primary' : ''}`} key={item.id} to={'/account' + item.href}>{item.text}</NavLink>
                            })
                        }
                    </nav>

                    <Button onClick={handleLogout} className="px-4 py-2 border border-black mt-10 ms-2 hover:bg-black hover:text-white">Logout</Button>
                </div>
                <div className="w-2/3">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Account;