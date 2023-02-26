import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from './ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ProductParams = {
    productId: string;
};

const Product = ({ isMyStore }: { isMyStore?: boolean }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState<ProductType>();
    const [isAdd, setIsAdd] = useState(false);
    const [quantity, setQuantity] = useState('0');

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

    const getDetailProduct = async () => {
        try {
            const { data } = await axios.get(`/api/product/${productId}`);
            setProduct(data[0]);
        } catch (error: any) {
            notify(error.message);
        }
    };

    const handleAddCart = async () => {
        if (Number(quantity) > Number(product?.stock)) {
            notify('Out of stock');
            return;
        }
        if (Number(quantity) <= 0) {
            notify('Quantity Cant be less than one');
            return;
        }
        try {
            await axios.post(`/api/cart`, {
                product: productId,
                quantity: Number(quantity)
            });
        } catch (error: any) {
            notify(error.message);
        }
        setIsAdd(false);
    };

    useEffect(() => {
        getDetailProduct();
    }, [productId]);
    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <div className="shadow-lg">
                <img src={product?.picture} alt="product picture" className="p-4 rounded-t-lg lg:w-[600px] md:w-[300px]" />
            </div>
            <div className="lg:w-[600px] md:w-[300px] mt-2 bg-slate-50 rounded-md p-4 shadow-md">
                <div className="flex justify-between w-full">
                    <h1 className="text-2xl font-bold mt-4">{product?.name}</h1>
                    <h1 className="text-2xl font-bold mt-4">Rp {product?.price}</h1>
                </div>
                <p className="mt-2">Stock : {product?.stock}</p>
                <p className="mt-4">{product?.description}</p>
                <div className="flex justify-between mt-4">
                    <>
                        {isAdd ? (
                            <div className="flex flex-col gap-2">
                                <input
                                    placeholder="1"
                                    className="w-[100px] bg-slate-500 rounded-md text-white text-center outline-none"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                />
                                <button
                                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={handleAddCart}
                                >
                                    Add
                                </button>
                                <button
                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={() => setIsAdd(false)}
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <>
                                {!isMyStore && product?.stock !== '0' && (
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={() => setIsAdd(true)}
                                    >
                                        Add to cart
                                    </button>
                                )}
                            </>
                        )}
                    </>
                </div>
            </div>
        </div>
    );
};

export default Product;
