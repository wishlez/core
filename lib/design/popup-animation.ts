import {TargetAndTransition} from 'framer-motion';
import {Tween} from './helpers/tween';
import {WithDirection} from './helpers/with-direction';

const commonInitial: TargetAndTransition = {
    opacity: 0,
    scale: 0
};
const commonAnimate: TargetAndTransition = {
    opacity: 1,
    scale: 1
};

const getTranslationX = ({
    alignHorizontal,
    alignVertical
}: WithDirection): Tween => {
    switch (alignHorizontal) {
        case 'right':
            return {
                x: {
                    from: alignVertical === 'middle' ? '-50%' : '50%',
                    to: '0'
                }
            };
        case 'left':
            return {
                x: {
                    from: alignVertical === 'middle' ? '50%' : '-50%',
                    to: '0'
                }
            };
        case 'center':
            return {
                x: {
                    from: '-50%',
                    to: '-50%'
                }
            };
    }
};

const getTranslationY = ({
    alignVertical
}: WithDirection): Tween => {
    switch (alignVertical) {
        case 'top':
            return {
                y: {
                    from: '50%',
                    to: '0'
                }
            };
        case 'bottom':
            return {
                y: {
                    from: '-50%',
                    to: '0'
                }
            };
        case 'middle':
            return {
                y: {
                    from: '-50%',
                    to: '-50%'
                }
            };
    }
};

export const usePopupAnimation = ({
    alignHorizontal,
    alignVertical
}: WithDirection): {
    animate: TargetAndTransition
    exit: TargetAndTransition
    initial: TargetAndTransition
} => {
    const {x} = getTranslationX({
        alignHorizontal,
        alignVertical
    });
    const {y} = getTranslationY({
        alignHorizontal,
        alignVertical
    });
    const initial = {
        ...commonInitial,
        x: x.from,
        y: y.from
    };

    return {
        animate: {
            ...commonAnimate,
            x: x.to,
            y: y.to
        },
        exit: initial,
        initial
    };
};
