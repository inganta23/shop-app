import axios from 'axios';
import React, { useState } from 'react';

const Form = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');

    const handleCreateProduct = async (event: React.FormEvent) => {
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
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitPicture = async (pic: any) => {
        if (pic === undefined) {
            console.log('Please Select an image');
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
                    console.log(err);
                });
        } else {
            console.log('Please Select an image');
            return;
        }
    };
    return (
        <form onSubmit={handleCreateProduct}>
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
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Form;
