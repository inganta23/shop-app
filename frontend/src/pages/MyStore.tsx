import axios from 'axios';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AllProducts from '../components/AllProducts';
import store from '../assets/store.jpg';

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
            <div className="text-3xl flex flex-col items-center justify-center mt-8 shadow-lg max-w-[900px] mx-auto rounded-lg p-6">
                <img src={store} alt="Delivery" className="lg:w-[800px] lg:h-[400px] md:w-[600px] md:h-[200px] rounded-md" />
                <h1 className="text-3xl px-6 py-2 font-sans font-semibold text-white transition duration-300 ease-in-out delay-300 skew-y-6 bg-purple-600 border-b-4 border-purple-800 rounded shadow-lg shadow-purple-600/50 hover:skew-x-6 hover:border-purple-600">
                    Open Your Store
                </h1>
            </div>
            <Outlet />
            <AllProducts isMyStore={true} />
        </div>
    );
};
