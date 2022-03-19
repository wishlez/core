import {FunctionComponent} from 'react';
import styled, {css} from 'styled-components';
import {Box} from './box';
import {Button} from './button';
import {Icon} from './icon';
import {WithPageLayoutState} from './page-layout-state';

type Props = WithPageLayoutState;

const _Header = styled(Box.withComponent('header'))`
    padding: var(--uniform-padding);
    position: sticky;
    top: 0;
    left: 0;
`;

const HeaderContent = styled.section<WithPageLayoutState>`
    transition: var(--transition);
    line-height: var(--page-header-height);
    min-height: var(--page-header-height);

    ${(props) => props.isInDesktop ? css`
        display: flex;
        justify-content: end;
    ` : css`
        background-color: var(--mono-999);
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow-3);
        display: grid;
        grid-template-columns: 1fr auto;
        justify-items: start;
    `}
`;

export const PageHeader: FunctionComponent<Props> = (props) => (
    <_Header>
        <HeaderContent {...props}>
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
        </HeaderContent>
    </_Header>
);
