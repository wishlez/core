import {FunctionComponent, useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {Button} from './button';
import {Icon} from './icon';
import {usePageHeader} from './page-header-provider';
import {WithPageLayoutState} from './page-layout-state';
import {Title} from './title';

type Props = WithPageLayoutState;

const _Header = styled('header')`
    padding: var(--uniform-padding);
    position: sticky;
    top: 0;
    left: 0;
`;

const HeaderContent = styled.section<WithPageLayoutState<{ isRaised: boolean }>>`
    transition: var(--transition);
    line-height: var(--page-header-height);
    height: var(--page-header-height);
    display: grid;
    justify-items: start;

    ${(props) => props.isInDesktop ? css`
        grid-template-columns: 1fr auto;
    ` : css`
        grid-template-columns: auto 1fr auto;
    `}

    ${(props) => props.isRaised && css`
        background-color: var(--mono-999);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow-3);
    `}
`;

const getRaisedState = (ref: HTMLDivElement) => {
    if (ref) {
        const threshold = parseFloat(getComputedStyle(ref).fontSize);

        return window.scrollY > threshold;
    }

    return false;
};

export const PageHeader: FunctionComponent<Props> = (props) => {
    const ref = useRef<HTMLDivElement>();
    const [isRaised, setIsRaised] = useState<boolean>(getRaisedState(ref.current));
    const {title} = usePageHeader();

    useEffect(() => {
        const handleScroll = () => setIsRaised(getRaisedState(ref.current));

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [ref]);

    return (
        <_Header>
            <HeaderContent
                {...props}
                isRaised={isRaised}
                ref={ref}
            >
                {!props.isInDesktop && (
                    <Button
                        color={'secondary'}
                        onClick={() => props.setIsNavOpen(true)}
                        size={'cozy'}
                        type={'button'}
                        variant={'text'}
                    >
                        <Icon type={'menu'}/>
                    </Button>
                )}
                {title && (
                    <Title size={'h2'}>
                        {title}
                    </Title>
                )}
                {props.children}
            </HeaderContent>
        </_Header>
    );
};
