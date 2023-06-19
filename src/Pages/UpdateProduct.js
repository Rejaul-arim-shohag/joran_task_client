import React, { Suspense, lazy } from 'react';
import LazyLoader from '../components/MasterLayout/LazyLoader';
import MasterLayout from '../components/MasterLayout/MasterLayout';
const Update = lazy(() => import('../components/Update/update'));

const UpdateProduct = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Update/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default UpdateProduct;