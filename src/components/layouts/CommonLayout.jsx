import { useContext, useEffect } from "react"
import { Outlet, ScrollRestoration } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { BagProvider } from "../context/BagContext";
import { WishlistProvider } from "../context/WishlistContext";
import useAuth from "../hooks/useAuth";
import { RedirectProvider } from "../context/RedirectContext";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const CommonLayout = () => {
    const { setUser } = useContext(UserContext);
    const {authenticate} = useAuth();

    // Authenticate user
    useEffect(()=> {
        authenticate();
    }, [])

    return (
        <>
            <ScrollRestoration />
            <BagProvider>
                <WishlistProvider>
                    <RedirectProvider>
                        <Outlet />
                    </RedirectProvider>
                </WishlistProvider>
            </BagProvider>
            <ToastContainer />
        </>
    )
}

export default CommonLayout