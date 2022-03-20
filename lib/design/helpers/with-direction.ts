import {css} from 'styled-components';
import {AnyObject} from '../../../types/object';
import {Transient} from './transient';

type AlignVertical = 'top' | 'bottom' | 'middle';
type AlignHorizontal = 'left' | 'right' | 'center';

export type WithDirection<P = AnyObject> = P & {
    alignVertical?: AlignVertical
    alignHorizontal?: AlignHorizontal
}

const validate = <T>(align: T[], alignment: T) => align ? align.includes(alignment) : true;

const applyDirectionalStyle = ({h, v}: { h?: AlignHorizontal[], v?: AlignVertical[] } = {}) =>
    ({$alignHorizontal, $alignVertical}: Transient<WithDirection>, css: any) =>
        validate(h, $alignHorizontal) && validate(v, $alignVertical) ? css : '';

export const withDirection = (props: Transient<WithDirection>) => css`
    position: absolute;

    ${applyDirectionalStyle({v: ['top']})(props, css`
        bottom: 100%;
        top: auto;
    `)};

    ${applyDirectionalStyle({v: ['bottom']})(props, css`
        top: 100%;
    `)};

    ${applyDirectionalStyle({v: ['middle']})(props, css`
        top: 50%;
    `)};

    ${applyDirectionalStyle({h: ['left'], v: ['top', 'bottom']})(props, css`
        left: 0;
        right: auto;
    `)};

    ${applyDirectionalStyle({h: ['right'], v: ['top', 'bottom']})(props, css`
        left: auto;
        right: 0;
    `)};

    ${applyDirectionalStyle({h: ['center']})(props, css`
        left: 50%;
    `)};

    ${applyDirectionalStyle({h: ['left'], v: ['middle']})(props, css`
        left: auto;
        right: 100%;
    `)};

    ${applyDirectionalStyle({h: ['right'], v: ['middle']})(props, css`
        left: 100%;
        right: auto;
    `)};
`;
