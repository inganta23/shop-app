import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard, { ProductType } from './ProductCard';
import PaginatedItems from './Pagination';
import ReactLoading from 'react-loading';

const AllProducts = ({ isMyStore }: { isMyStore?: boolean }) => {
    const [allProduct, setAllProduct] = useState([]);
    const [myProduct, setMyProduct] = useState([]);
    const [currentItems, setCurrentItems] = useState<Array<ProductType>>([]);
    const [loading, setLoading] = useState(false);
    const getAllProduct = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/product');
            setAllProduct(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
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

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <ReactLoading type={'spin'} color={'blue'} height={100} width={100} />
            </div>
        );
    else if (isMyStore)
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
