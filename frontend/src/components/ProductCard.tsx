import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface ProductType {
    createdAt: string;
    description: string;
    name: string;
    price: string;
    stock: string;
    updatedAt: string;
    picture: string;
    __v: number;
    user: string;
    _id: string;
}

const ProductCard = ({ product }: { product: ProductType }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full max-w-[300px] max-h-[300px] bg-white border border-gray-200 rounded-lg shadow cursor-pointer justify-center" onClick={() => navigate(`${product._id}`)}>
            <div>
                <img className="px-8 my-8 rounded-t-lg w-[300px] h-[140px] mx-auto" src={product.picture} alt="product image" />
            </div>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-md font-semibold tracking-tight text-gray-900">{product.name}</h5>
                </a>
                <div className="flex items-center justify-between pt-4">
                    <span className="text-xl font-bold text-gray-900 ">Rp {product.price}</span>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
