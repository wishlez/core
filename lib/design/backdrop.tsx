import styled from 'styled-components';
import {FullScreen} from './fullScreen';

export const Backdrop = styled(FullScreen)`
    background-color: rgba(0, 0, 0, 0.23);
    backdrop-filter: blur(2px);
`;
