import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import happy from '../assets/happy.jpg';

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

    // useEffect(() => {
    //     getUser();
    // }, []);
    return (
        <div className="mt-10 lg:px-10 sm:px-4 text-center">
            <div className="text-3xl flex flex-col items-center justify-center mt-8 shadow-lg max-w-[900px] mx-auto rounded-lg p-6">
                <img src={happy} alt="Delivery" className="lg:w-[800px] lg:h-[400px] md:w-[600px] md:h-[200px] rounded-md" />
                <h1 className="px-6 py-2 font-sans font-semibold text-white transition duration-300 ease-in-out delay-300 skew-y-6 border-b-4 rounded shadow-lg bg-cyan-600 border-cyan-800 shadow-cyan-600/50 hover:skew-x-6 hover:border-cyan-600">
                    Always Ready For You
                </h1>
            </div>
            <h1 className="text-3xl font-bold tracking-wide mt-10">Welcome to Jon - Shop!</h1>
            <p className="text-lg tracking-wide">
                We specialize in good family shopping, and here you can find clothing, footwear, fabric, hardware, gifts, home goods, toys— all the basics for your home and family, with great brands
                and great value. You can browse the newest products in our online store here, or use the menus to find exactly what you need.
            </p>
        </div>
    );
};

export default About;
