import React, { Suspense, lazy } from 'react';
import LazyLoader from '../components/MasterLayout/LazyLoader';
import MasterLayout from '../components/MasterLayout/MasterLayout';
const Products = lazy(() => import('../components/Products/Products'));
const ProductsPage = () => {
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

export default ProductsPage;