import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ProductType } from './ProductCard';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

const Form = ({ isEdit, product }: { isEdit?: boolean; product?: ProductType }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setStock(product.stock);
            setDescription(product.description);
            setPicture(product.picture);
        }
    }, [isEdit]);

    const handleCreateProduct = async (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        try {
            await axios.post('/api/product/', {
                name,
                price,
                stock,
                description,
                picture
            });
            setName('');
            setPrice('');
            setStock('');
            setDescription('');
            navigate('/mystore');
            location.reload();
        } catch (error: any) {
            notify(error.message);
        }
        setLoading(false);
    };

    const handleSubmitPicture = async (pic: any) => {
        if (pic === undefined) {
            notify('Please Select an image');
            return;
        }

        if (pic.type === 'image/jpeg' || pic.type === 'image/png') {
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'shop-app');
            data.append('cloud_name', 'dontqomnd');
            fetch('https://api.cloudinary.com/v1_1/dontqomnd/image/upload', {
                method: 'post',
                body: data
            })
                .then((res) => res.json())
                .then((data) => {
                    setPicture(data.url.toString());
                })
                .catch((err: any) => {
                    notify(err.message);
                });
        } else {
            notify('Please Select an image');
            return;
        }
    };

    const handleEditProduct = async (event: React.FormEvent) => {
        setLoading(true);
        event.preventDefault();
        try {
            await axios.put(`/api/product/${product?._id}`, {
                name,
                price,
                stock,
                description,
                picture
            });
            setName('');
            setPrice('');
            setStock('');
            setDescription('');
            location.reload();
        } catch (error: any) {
            notify(error.message);
        }
        setLoading(false);
    };
    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <form onSubmit={isEdit ? handleEditProduct : handleCreateProduct}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Product Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="White T-Shirt"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Product Price (Rp)
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="text"
                        placeholder="50000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                        Product Stock
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="stock"
                        type="text"
                        placeholder="10"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">
                        Product Image
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={(e: any) => handleSubmitPicture(e.target.files[0])}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow form-textarea mt-1 block w-full border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows={5}
                        id="description"
                        placeholder="Describe Your Product"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {loading ? <ReactLoading type={'spin'} color={'blue'} height={20} width={20} /> : 'Submit'}
                    </button>
                </div>
            </form>
        </>
    );
};

export default Form;
