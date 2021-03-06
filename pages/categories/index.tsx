import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';

const Categories: FunctionComponent = () => null;

export default Categories;

export const getServerSideProps: GetServerSideProps = async () => ({
    redirect: {
        destination: '/categories/tags',
        permanent: true
    }
});
