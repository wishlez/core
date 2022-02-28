import styled from 'styled-components';

export const Badge = styled.span`
    display: inline-block;
    background-color: var(--mono-800);
    margin: var(--grid-gap-small);
    padding: var(--control-padding-cozy);
    cursor: pointer;
    user-select: none;
    transition: var(--transition);

    &:hover {
        background-color: var(--mono-700);
    }
`;
