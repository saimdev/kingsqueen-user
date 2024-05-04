import { useContext } from "react"
import { RedirectContext } from "../context/RedirectContext"
import { useNavigate } from "react-router-dom";


const useRedirect = ()=> {
    const {redirect, setRedirect} = useContext(RedirectContext);
    const navigate = useNavigate();

    const setRedirectPath = (path) => {
        setRedirect(path);
    }

    const applyRedirect = ()=> {
        if(redirect){
            const path = redirect;
            setRedirect(null);
            navigate(path);
        }
    }

    const clearRedirect = ()=> {
        setRedirect(null);
    }

    const isRedirect = ()=> {
        return redirect ? true : false;
    }

    return {setRedirectPath, applyRedirect, clearRedirect, isRedirect};
}

export default useRedirect;