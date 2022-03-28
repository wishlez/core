import styled from 'styled-components';

type Props = {
    size?: 'normal' | 'small'
}

const withFontSize = (props: Props) => {
    switch (props.size) {
        case 'normal':
            return '1em';
        case 'small':
            return '.75em';
    }
};

export const Label = styled.label<Props>`
    color: var(--mono-300);
    font-size: ${withFontSize};
    font-weight: bold;
`;

Label.defaultProps = {
    size: 'small'
};
