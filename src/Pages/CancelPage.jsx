import React, { Suspense, lazy } from 'react';
import LazyLoader from '../components/MasterLayout/LazyLoader';
import MasterLayout from '../components/MasterLayout/MasterLayout';
const Canceled = lazy(() => import('../components/Canceled/Cancled'));

const CancelPage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Canceled/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default CancelPage;