import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { State } from '../context/Context';
import CartItem from './CartItem';
import PaginatedItems from './Pagination';
import { ProductType } from './ProductCard';
import ReactLoading from 'react-loading';

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
    const [carts, setCarts] = useState<Array<CartType>>([]);
    const [currentItems, setCurrentItems] = useState<Array<CartType>>([]);
    const [loading, setLoading] = useState(false);

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

    const handleCheckout = async () => {
        const productsId = carts?.map((cart) => cart.product._id);
        const quantities = carts?.map((cart) => cart.quantity);
        if (productsId.length === 0) {
            notify('You have nothing in cart');
            return;
        }
        try {
            await axios.post('/api/cart/checkout', { productsId, quantities });
            //@ts-ignore
            for (let i = 0; i < carts.length || 0; i++) {
                //@ts-ignore
                await axios.delete(`/api/cart/${carts[i]._id}`);
            }
            notify('Thank You For Buying');
            location.reload();
        } catch (error: any) {
            notify(error.message);
        }
    };

    const getCart = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/cart');
            setCarts(data);
        } catch (error: any) {
            notify(error.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        getCart();
    }, []);
    if (loading)
        return (
            <div className="flex justify-center items-center">
                <ReactLoading type={'spin'} color={'blue'} height={100} width={100} />
            </div>
        );
    else
        return (
            <div>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                <h1 className="text-2xl">{`Cart ${user.name}`}</h1>
                <p>{`Total Product : ${carts?.length}`}</p>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
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
                            {currentItems?.map((cart) => (
                                <CartItem cart={cart} getCart={getCart} key={cart._id} />
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <PaginatedItems items={carts} setCurrentItems={setCurrentItems} currentItems={currentItems} />
                </div>
                <button className="p-2 rounded-md bg-blue-700 mt-6 text-white shadow-sm" onClick={handleCheckout}>
                    Checkout All Product
                </button>
            </div>
        );
};

export default Cart;
