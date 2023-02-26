import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { State } from '../context/Context';
import Cart from './Cart';
import Form from './Form';
import Modal from './Modal';
import History from './History';

const Navbar = ({ children }: { children: JSX.Element }) => {
    const [showModalProduct, setShowModalProduct] = useState(false);
    const [showModalCart, setShowModalCart] = useState(false);
    const [showModalHistory, setShowModalHistory] = useState(false);
    const [select, setSelect] = useState('user');

    const handleLogout = async () => {
        try {
            await axios.delete('/api/session');
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    const { user } = State();

    useEffect(() => {
        if (select === 'logout') {
            handleLogout();
        } else if (select === 'history') {
            setSelect('user');
            setShowModalHistory(true);
        }
    }, [select]);
    return (
        <>
            <div>
                <Modal showModal={showModalProduct} setShowModal={setShowModalProduct}>
                    <Form />
                </Modal>
                <Modal showModal={showModalCart} setShowModal={setShowModalCart}>
                    <Cart />
                </Modal>
                <Modal showModal={showModalHistory} setShowModal={setShowModalHistory}>
                    <History />
                </Modal>
                <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
                    {/* logo */}
                    <h1 className="w-3/12 ">
                        <Link
                            to={'/main'}
                            className="text-xl px-6 py-2 font-sans font-semibold text-white transition duration-300 ease-in-out delay-300 skew-y-6 border-b-4 rounded shadow-lg bg-cyan-600 border-cyan-800 shadow-cyan-600/50 hover:skew-x-6 hover:border-cyan-600"
                        >
                            Jon - Shop
                        </Link>
                    </h1>
                    {/* navigation */}
                    <nav className="nav font-semibold text-lg">
                        <ul className="flex items-center">
                            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                                <Link to={'/about'}>About</Link>
                            </li>
                            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                                <Link to={'/mystore'}>My Store</Link>
                            </li>
                        </ul>
                    </nav>
                    {/* buttons -*/}
                    <div className="w-3/12 gap-5 flex justify-end items-center">
                        <button className="p-2 rounded-md bg-red-400 text-white shadow-sm" onClick={() => setShowModalProduct(true)}>
                            Add Product
                        </button>
                        <button className="p-2 rounded-md bg-blue-700 text-white shadow-sm" onClick={() => setShowModalCart(true)}>
                            Cart
                        </button>

                        <div className="p-2 rounded-md bg-green-600 text-white shadow-sm cursor-pointer">
                            <select className="w-full px-2.5 bg-green-600 rounded-md shadow-sm outline-none appearance-none cursor-pointer" value={select} onChange={(e) => setSelect(e.target.value)}>
                                <option value="user">{(user && user.name) || 'User'}</option>
                                <option value="logout">Logout</option>
                                <option value="history">History</option>
                            </select>
                        </div>
                    </div>
                </header>
            </div>
            {children}
        </>
    );
};

export default Navbar;
