import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Guard = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const getUser = async () => {
        setLoading(true);
        try {
            await axios.get('/api/user/me');
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
            <div className="flex justify-center items-center h-screen">
                <ReactLoading type={'spin'} color={'blue'} height={100} width={100} />
            </div>
        );
    else return <div>{children}</div>;
};

export default Guard;
