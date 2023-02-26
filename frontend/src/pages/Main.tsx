import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AllProducts from '../components/AllProducts';
import ReactLoading from 'react-loading';

const Main = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const getUser = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/user/me');
            setUser(data);
        } catch (error) {
            navigate('/');
        }
        setLoading(false);
    };

    useEffect(() => {
        getUser();
    }, []);
    if (loading)
        return (
            <div className="w-fit mx-auto">
                <ReactLoading type={'spin'} color={'blue'} height={600} width={300} />
            </div>
        );
    else
        return (
            <div>
                <Outlet />
                <AllProducts />
            </div>
        );
};

export default Main;
