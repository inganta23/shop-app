import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const getUser = async () => {
        setLoading(true);
        try {
            await axios.get('/api/user/me');
            navigate('main');
        } catch (error) {}
        setLoading(false);
    };
    useEffect(() => {
        getUser();
    }, []);
    if (loading)
        return (
            <div className="flex justify-center items-center h-screen bg-gray-800">
                <ReactLoading type={'spin'} color={'blue'} height={100} width={100} />
            </div>
        );
    else return <div>{children}</div>;
};

export default AuthGuard;
