import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
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

    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className="mt-10 lg:px-10 sm:px-4 text-center">
            <h1 className="text-3xl font-bold tracking-wide">Welcome to Jon - Shop!</h1>
            <p className="text-lg tracking-wide">
                We specialize in good family shopping, and here you can find clothing, footwear, fabric, hardware, gifts, home goods, toys— all the basics for your home and family, with great brands
                and great value. You can browse the newest products in our online store here, or use the menus to find exactly what you need.
            </p>
        </div>
    );
};

export default About;
