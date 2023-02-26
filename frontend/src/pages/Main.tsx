import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AllProducts from '../components/AllProducts';
import ReactLoading from 'react-loading';

const Main = () => {
    return (
        <div>
            <Outlet />
            <AllProducts />
        </div>
    );
};

export default Main;
