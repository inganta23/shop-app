import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartType } from './Cart';

const CartItem = ({ cart, getCart }: { cart: CartType; getCart: () => Promise<void> }) => {
    const [edit, setEdit] = useState(false);
    const [editedCart, setEditedCart] = useState(`${cart.quantity}`);
    const navigate = useNavigate();
    const handleEditQuantity = async () => {
        try {
            await axios.put(`/api/cart/${cart._id}`, {
                quantity: Number(editedCart)
            });
            getCart();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCart = async () => {
        try {
            await axios.delete(`/api/cart/${cart._id}`);
            getCart();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {cart.product.name}
            </th>
            <td className="px-6 py-4 text-center text-black">
                <div className="flex items-center gap-2">
                    {!edit ? (
                        <input className="w-[30px] text-white bg-transparent" value={cart.quantity} readOnly />
                    ) : (
                        <input className="text-black w-[20px]" value={editedCart} onChange={(e) => setEditedCart(e.target.value)} type="number" />
                    )}
                    <button className="p-1 bg-green-700 text-white rounded-sm" onClick={!edit ? () => setEdit(true) : handleEditQuantity}>
                        {!edit ? 'Edit' : 'Submit'}
                    </button>
                    {edit && (
                        <button
                            className="p-1 bg-red-700 text-white rounded-sm"
                            onClick={() => {
                                setEdit(false);
                                setEditedCart(`${cart.quantity}`);
                            }}
                        >
                            Close
                        </button>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 flex gap-2">
                <button
                    className="p-1 bg-red-400 text-white rounded-sm"
                    onClick={() => {
                        navigate(`/main/${cart.product._id}`);
                        location.reload();
                    }}
                >
                    See
                </button>
                <button className="p-1 bg-blue-700 text-white rounded-sm"> Checkout </button>
                <button className="p-1 bg-red-600 text-white rounded-sm" onClick={handleDeleteCart}>
                    {' '}
                    Delete{' '}
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
