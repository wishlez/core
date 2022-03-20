import Head from 'next/head';
import {FunctionComponent, useEffect} from 'react';
import {usePageHeader} from '../../design/page-header-provider';

type Props = {
    title?: string
}

export const PageTitle: FunctionComponent<Props> = (props) => {
    const {setTitle} = usePageHeader();

    useEffect(() => {
        setTitle(props.title);

        return () => setTitle(null);
    }, [setTitle, props.title]);

    return (
        <Head>
            <title>
                {props.title ? `${props.title} | ` : ''}
                {`Wishlez v${process.env.VERSION}`}
            </title>
        </Head>
    );
};
