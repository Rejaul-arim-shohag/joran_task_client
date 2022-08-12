import React, { Suspense, lazy } from 'react';
import LazyLoader from '../components/MasterLayout/LazyLoader';
import MasterLayout from '../components/MasterLayout/MasterLayout';
const Complete = lazy(() => import('../components/Completed/Complete'));

const CompletedPage = () => {
    return (
        <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
            <Complete/>
            </Suspense>
        </MasterLayout>
    </>
    );
};

export default CompletedPage;