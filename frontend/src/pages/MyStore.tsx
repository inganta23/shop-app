import axios from 'axios';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AllProducts from '../components/AllProducts';

export const MyStore = () => {
    const navigate = useNavigate();
    const getUser = async () => {
        // setLoading(true);
        try {
            await axios.get('/api/user/me');
        } catch (error) {
            navigate('/');
        }
        // setLoading(false);
    };

    // useEffect(() => {
    //     getUser();
    // }, []);
    return (
        <div>
            <Outlet />
            <AllProducts isMyStore={true} />
        </div>
    );
};
