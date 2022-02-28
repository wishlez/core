import {FunctionComponent, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

export const Portal: FunctionComponent = (props) => {
    const ref = useRef<HTMLElement>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.getElementById('portal');

        setMounted(true);
    }, []);

    return mounted ? createPortal(props.children, ref.current) : null;
};
