import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard, { ProductType } from './ProductCard';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import PaginatedItems from './Pagination';

const AllProducts = ({ isMyStore }: { isMyStore?: boolean }) => {
    const [allProduct, setAllProduct] = useState([]);
    const [myProduct, setMyProduct] = useState([]);
    const [currentItems, setCurrentItems] = useState<Array<ProductType>>([]);
    const getAllProduct = async () => {
        try {
            const { data } = await axios.get('/api/product');
            setAllProduct(data);
        } catch (error) {
            console.log(error);
        }
    };
    const getMyProduct = async () => {
        try {
            const { data } = await axios.get('/api/product/me');
            setMyProduct(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllProduct();
    }, []);
    useEffect(() => {
        getMyProduct();
    }, [isMyStore]);
    if (isMyStore)
        return (
            <>
                <div className="flex gap-8 flex-wrap lg:p-20 md:p-8 items-center justify-center">
                    {currentItems && currentItems.map((product: ProductType) => <ProductCard isMyStore={isMyStore} product={product} key={product._id} />)}
                </div>
                <PaginatedItems items={myProduct} setCurrentItems={setCurrentItems} currentItems={currentItems} />
            </>
        );
    else
        return (
            <>
                <div className="flex gap-8 flex-wrap lg:p-20 md:p-8 items-center justify-center">
                    {currentItems && currentItems.map((product: ProductType) => <ProductCard product={product} key={product._id} />)}
                </div>
                <PaginatedItems items={allProduct} setCurrentItems={setCurrentItems} currentItems={currentItems} />
            </>
        );
};

export default AllProducts;
