import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CartType } from './Cart';

const CartItem = ({ cart, getCart }: { cart: CartType; getCart: () => Promise<void> }) => {
    const [edit, setEdit] = useState(false);
    const [editedCart, setEditedCart] = useState(`${cart.quantity}`);
    const navigate = useNavigate();

    const notify = (message: string) =>
        toast(message, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });

    const handleEditQuantity = async () => {
        if (Number(editedCart) > Number(cart.product.stock)) {
            notify('Out of Stock');
            return;
        }
        if (Number(editedCart) <= 0) {
            notify('Quantitny cant be less than one');
            return;
        }
        try {
            await axios.put(`/api/cart/${cart._id}`, {
                quantity: Number(editedCart)
            });
            setEdit(false);
            getCart();
        } catch (error: any) {
            notify(error.message);
        }
        setEdit(false);
    };

    const handleDeleteCart = async () => {
        try {
            await axios.delete(`/api/cart/${cart._id}`);
            getCart();
            notify('Cart Deleted');
        } catch (error: any) {
            notify(error.message);
        }
    };

    const handleCheckout = async () => {
        const productsId = [cart.product._id];
        const quantities = [cart.quantity];
        try {
            await axios.post('/api/cart/checkout', { productsId, quantities });
            //@ts-ignore
            await axios.delete(`/api/cart/${cart._id}`);
            notify('Thank You For Buying');
            location.reload();
        } catch (error: any) {
            notify(error.message);
        }
    };
    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <tr className=" border-b bg-gray-800 border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
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
                    <button className="p-1 bg-blue-700 text-white rounded-sm" onClick={handleCheckout}>
                        {' '}
                        Checkout{' '}
                    </button>
                    <button className="p-1 bg-red-600 text-white rounded-sm" onClick={handleDeleteCart}>
                        Delete{' '}
                    </button>
                </td>
            </tr>
        </>
    );
};

export default CartItem;
