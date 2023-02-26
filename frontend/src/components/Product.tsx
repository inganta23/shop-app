import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductType } from './ProductCard';

type ProductParams = {
    productId: string;
};

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<ProductType>();
    const getDetailProduct = async () => {
        try {
            const { data } = await axios.get(`/api/product/${productId}`);
            setProduct(data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddCart = async () => {
        try {
            await axios.post(`/api/cart`, {
                product: productId,
                quantity: 1
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDetailProduct();
    }, [productId]);
    return (
        <div className="flex flex-col justify-center items-center mt-20">
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
                    <button className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Add to wishlist
                    </button>
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleAddCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
