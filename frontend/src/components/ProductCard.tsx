import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Modal from './Modal';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';

export interface ProductType {
    createdAt: string;
    description: string;
    name: string;
    profit?: string;
    price: string;
    stock: string;
    updatedAt: string;
    picture: string;
    __v: number;
    user: string;
    _id: string;
}

const ProductCard = ({ product, isMyStore }: { product: ProductType; isMyStore?: boolean }) => {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [quantity, setQuantity] = useState('0');
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

    const handleDeleteProduct = async () => {
        setLoading(true);
        try {
            await axios.delete(`/api/product/${product._id}`);
            location.reload();
        } catch (error: any) {
            notify(error.message);
        }
        setLoading(false);
    };
    const handleAddCart = async () => {
        setLoading(true);
        if (Number(quantity) > Number(product?.stock)) {
            setLoading(false);
            notify('Out of stock');
            return;
        }
        if (Number(quantity) <= 0) {
            setLoading(false);
            notify('Quantity Cant be less than one');
            return;
        }
        try {
            await axios.post(`/api/cart`, {
                product: product._id,
                quantity: Number(quantity)
            });
            setIsAdd(false);
            notify('Added to cart');
        } catch (error: any) {
            notify(error.message);
        }
        setLoading(false);
    };
    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <Modal showModal={isEdit} setShowModal={setIsEdit}>
                <Form isEdit={isEdit} product={product} />
            </Modal>
            <div className="w-full max-w-[300px] max-h-[500px] bg-white border border-gray-200 rounded-lg shadow cursor-pointer justify-center">
                <div onClick={() => navigate(`${product._id}`)}>
                    <img className="px-8 my-8 rounded-t-lg w-[300px] h-[150px] mx-auto" src={product.picture} alt="product image" />
                </div>
                <div className="px-5 pb-5">
                    <h5 className="text-md font-semibold tracking-tight text-red-500">{Number(product.stock) === 0 ? 'Out Of Stock' : ''}</h5>
                    <h5 className="text-md font-semibold tracking-tight text-gray-900">{product.name}</h5>
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex flex-col gap-4">
                            <p className="text-md font-semibold text-gray-900 ">Rp {product.price}</p>
                            {isMyStore && <p className="text-md font-semibold text-gray-900 ">Profit - Rp {product.profit || '0'}</p>}
                        </div>

                        {isMyStore ? (
                            <div className="flex flex-col gap-2">
                                <button
                                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={() => setIsEdit(true)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={handleDeleteProduct}
                                >
                                    {loading ? <ReactLoading type={'spin'} color={'blue'} height={20} width={20} /> : 'Delete'}
                                </button>
                            </div>
                        ) : (
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
                                            {loading ? <ReactLoading type={'spin'} color={'blue'} height={20} width={20} /> : 'Add'}
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
                                        {Number(product.stock) > 0 && (
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
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
