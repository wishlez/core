import {GetServerSideProps} from 'next';
import {FunctionComponent} from 'react';

type Categories = FunctionComponent

const Categories: Categories = () => null;

export default Categories;

export const getServerSideProps: GetServerSideProps = async () => ({
    redirect: {
        destination: '/categories/tags',
        permanent: true
    }
});
