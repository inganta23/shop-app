import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AllProducts from '../components/AllProducts';
import fastImage from '../assets/fast-delivery.jpg';

const Main = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center mt-8 shadow-lg max-w-[900px] mx-auto rounded-lg p-6">
                <img src={fastImage} alt="Delivery" className="lg:w-[800px] lg:h-[400px] md:w-[600px] md:h-[200px] rounded-md" />
                <h1 className="text-3xl px-6 py-2 font-sans font-semibold text-white transition duration-300 ease-in-out delay-300 skew-y-6 bg-red-600 border-b-4 border-red-800 rounded shadow-lg shadow-red-600/50 hover:skew-x-6 hover:border-red-600">
                    Fast Delivery System
                </h1>
            </div>
            <Outlet />
            <AllProducts />
        </div>
    );
};

export default Main;
