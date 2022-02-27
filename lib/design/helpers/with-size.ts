import {css} from 'styled-components';
import {AnyObject} from '../../../types/object';

export type Size = 'comfortable' | 'compact'

export type WithSize<P = AnyObject> = P & {
    size?: Size
}

export const withSize = (props: WithSize) => {
    switch (props.size) {
        case 'compact' :
            return css`
                padding: var(--control-padding-compact);
            `;
        case 'comfortable' :
            return css`
                padding: var(--control-padding);
            `;
    }
};
