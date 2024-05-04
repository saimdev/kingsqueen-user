import { useContext } from "react"
import { UserContext } from "../context/UserContext"


const useAuth = () => {
    const {user, setUser} = useContext(UserContext);

    const authenticate = ()=> {
        fetch(import.meta.env.VITE_API_URL + '/authenticate', {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }else{
                    setUser({data: null, loading: false});
                }
            })
            .then(result => {
                if (result) {
                    setUser({ data: result.data, loading: false });
                }
            })
            .catch(error => {
                console.log('Unauthorized');
                setUser({data: null, loading: false});
            })
    }

    const isAuthenticated = () => {
        return user.data ? true : false;
    }

    const login = (user) => {
        setUser({data: user, loading: false});
    }

    const logout = () => {
        setUser({data: null, loading: true});
    }

    return {user, setUser, authenticate, isAuthenticated, login, logout}
}

export default useAuth