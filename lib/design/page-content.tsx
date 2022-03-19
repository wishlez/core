import styled, {css} from 'styled-components';
import {WithPageLayoutState} from './page-layout-state';

export const PageContent = styled.div<WithPageLayoutState>`
    transition: var(--transition);

    ${(props) => props.isInDesktop ? css`
        margin-left: var(--page-navigation-width);
    ` : css`
        margin-left: 0;
    `}
`;
