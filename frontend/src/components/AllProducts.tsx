import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard, { ProductType } from './ProductCard';

const AllProducts = () => {
    const [allProduct, setAllProduct] = useState([]);
    const getAllProduct = async () => {
        try {
            const { data } = await axios.get('/api/product');
            setAllProduct(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllProduct();
    }, []);
    return <div className="flex gap-8 flex-wrap p-8 items-center justify-center">{allProduct && allProduct.map((product: ProductType) => <ProductCard product={product} key={product._id} />)}</div>;
};

export default AllProducts;
