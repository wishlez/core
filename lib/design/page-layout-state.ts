import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useMediaQuery} from 'react-responsive';
import {AnyObject} from '../../types/object';

type PageLayoutState = {
    isInDesktop: boolean
    isNavOpen: boolean
    setIsNavOpen: Dispatch<SetStateAction<boolean>>
};

type UsePageLayoutState = () => PageLayoutState

export type WithPageLayoutState<P = AnyObject> = P & PageLayoutState;

export const usePageLayoutState: UsePageLayoutState = () => {
    const isInDesktop = useMediaQuery({query: '(min-width: 960px)'});
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        if (!isInDesktop) {
            setIsNavOpen(false);
        }
    }, [isInDesktop]);

    return {
        isInDesktop,
        isNavOpen,
        setIsNavOpen
    };
};
