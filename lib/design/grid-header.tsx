import styled from 'styled-components';

type Props = {
    align?: 'start' | 'end' | 'center'
}

export const GridHeader = styled.div<Props>`
    font-size: .85em;
    font-weight: bold;
    text-align: ${(props) => props.align};
`;

GridHeader.defaultProps = {
    align: 'start'
};
