import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import Form from './Form';
import Modal from './Modal';

const Navbar = () => {
    const [showModalProduct, setShowModalProduct] = useState(false);
    const [showModalCart, setShowModalCart] = useState(false);
    return (
        <div>
            <Modal showModal={showModalProduct} setShowModal={setShowModalProduct}>
                <Form />
            </Modal>
            <Modal showModal={showModalCart} setShowModal={setShowModalCart}>
                <Cart />
            </Modal>
            <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
                {/* logo */}
                <h1 className="w-3/12">
                    <Link to={'/main'} className="text-xl">
                        Jon - Shop
                    </Link>
                </h1>
                {/* navigation */}
                <nav className="nav font-semibold text-lg">
                    <ul className="flex items-center">
                        <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                            <a>About</a>
                        </li>
                        <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                            <a>Contact</a>
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
                </div>
            </header>
        </div>
    );
};

export default Navbar;
