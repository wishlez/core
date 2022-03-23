import styled from 'styled-components';

export const DetailsColumn = styled.section`
    display: flex;
    flex-direction: column;
`;

export const Details1 = styled(DetailsColumn)`
    align-items: start;
`;

export const Details2 = styled(DetailsColumn)`
    justify-content: space-between;
    align-items: end;
`;
