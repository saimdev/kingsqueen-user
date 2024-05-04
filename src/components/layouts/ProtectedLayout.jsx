import React, { useContext, useEffect, useState } from 'react';
import {Outlet, Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import useAuth from '../hooks/useAuth';

const ProtectedLayout = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const {user} = useAuth();
    console.log('Outside useEffect', user)

    useEffect(() => {
        console.log('Inside useEffect', user)
        if(user.loading === false && user.data !== null){
            setIsAuthenticated(true);
            setLoading(false);
        }else if(user.loading === false && user.data === null){
            navigate('/login');
        }
    }, [user]);

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <>
            {
                isAuthenticated ? <Outlet /> : <Navigate to='/login' />
            }
        </>
    );
};

export default ProtectedLayout;
