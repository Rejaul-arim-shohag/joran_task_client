import React, { Suspense, useEffect } from 'react';
import MasterLayout from '../components/MasterLayout/MasterLayout';
import LazyLoader from '../components/MasterLayout/LazyLoader';
import { GetProductList } from '../ApiRequest/APIRequest';
import Products from '../components/Products/Products';

const NewPage = () => {
    useEffect(() => {
        GetProductList()
    }, [])
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Products/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default NewPage;