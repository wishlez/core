import {createContext, Dispatch, FunctionComponent, SetStateAction, useContext, useState} from 'react';

type PageHeaderContext = {
    title: string
    setTitle: Dispatch<SetStateAction<string>>
}

const PageHeaderContext = createContext<PageHeaderContext>({
    setTitle: () => null,
    title: null
});

export const usePageHeader = () => useContext(PageHeaderContext);

export const PageHeaderProvider: FunctionComponent = (props) => {
    const [title, setTitle] = useState('');

    return (
        <PageHeaderContext.Provider
            value={{
                setTitle,
                title
            }}
        >
            {props.children}
        </PageHeaderContext.Provider>
    );
};
