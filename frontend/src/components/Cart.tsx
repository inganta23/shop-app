import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { State } from '../context/Context';
import CartItem from './CartItem';
import ProductCard, { ProductType } from './ProductCard';

export interface CartType {
    createdAt: string;
    quantity: number;
    product: ProductType;
    updatedAt: string;
    __v: number;
    user: string;
    _id: string;
}

const Cart = () => {
    const { user } = State();
    const [carts, setCarts] = useState<Array<CartType>>();

    const handleCheckout = async () => {
        const productsId = carts?.map((cart) => cart.product._id);
        const quantities = carts?.map((cart) => cart.quantity);
        try {
            await axios.post('/api/cart/checkout', { productsId, quantities });
            //@ts-ignore
            for (let i = 0; i < carts.length || 0; i++) {
                //@ts-ignore
                await axios.delete(`/api/cart/${carts[i]._id}`);
            }
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const getCart = async () => {
        try {
            const { data } = await axios.get('/api/cart');
            console.log(data);
            setCarts(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCart();
    }, []);
    return (
        <div>
            <h1 className="text-2xl">{`Cart ${user.name}`}</h1>
            <p>{`Total Product : ${carts?.length}`}</p>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts?.map((cart) => (
                            <CartItem cart={cart} getCart={getCart} key={cart._id} />
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="p-2 rounded-md bg-blue-700 mt-6 text-white shadow-sm" onClick={handleCheckout}>
                Checkout All Product
            </button>
        </div>
    );
};

export default Cart;
