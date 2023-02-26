import React from 'react';
import { useParams } from 'react-router-dom';

type ProductParams = {
    productId: string;
};

const Product = () => {
    let { productId } = useParams<ProductParams>();
    return <div>{productId}</div>;
};

export default Product;
