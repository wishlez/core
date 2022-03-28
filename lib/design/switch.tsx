import {motion} from 'framer-motion';
import {ChangeEvent, FormEvent, forwardRef, InputHTMLAttributes, useState} from 'react';
import styled, {css} from 'styled-components';
import {WithInputError, WithInputProps} from '../../types/input';
import {getRandomId} from './helpers/randomizer';
import {Label} from './label';

type Props = WithInputProps<InputHTMLAttributes<HTMLInputElement>> & {
    type?: 'checkbox'
};

const Container = styled.div`
    align-items: baseline;
    display: grid;
    grid-auto-flow: column;
    grid-gap: var(--grid-gap);
`;

const _Switch = styled.label<{ isOn: boolean }>`
    --switch-padding: 2px;
    --handle-width: calc(1em - 2 * var(--switch-padding));
    border-radius: .5em;
    cursor: pointer;
    display: inline-flex;
    justify-content: flex-start;
    padding: var(--switch-padding);
    height: 1em;
    width: calc(1em + var(--handle-width));

    ${(props) => props.isOn ? css`
        background-color: var(--core-500);
        justify-content: flex-end;
    ` : css`
        background-color: var(--mono-500);
        justify-content: flex-start;
    `}
`;

const Handle = styled(motion.span)`
    background-color: var(--mono-999);
    border-radius: 50%;
    width: var(--handle-width);
`;

const Input = styled.input<WithInputError>`
    display: none;
`;

export const Switch = forwardRef<HTMLInputElement, Props>(({label, note, error, ...props}, ref) => {
    const [invalid, setInvalid] = useState<boolean>(false);
    const id = props.id || getRandomId('select');
    const [isOn, setIsOn] = useState(props.checked);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsOn(event.target.checked);
        props.onChange?.(event);
    };

    const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setInvalid(true);
        props.onInvalid?.(event);
    };

    const handleInput = (event: FormEvent<HTMLInputElement>) => {
        setInvalid(false);
        props.onInput?.(event);
    };

    return (
        <Container>
            <Input
                {...props}
                hasError={invalid || Boolean(error)}
                id={id}
                onChange={handleChange}
                onInput={handleInput}
                onInvalid={handleInvalid}
                ref={ref}
                type={'checkbox'}
            />
            <_Switch
                htmlFor={id}
                isOn={isOn}
            >
                <Handle
                    layout
                    transition={{
                        damping: 25,
                        stiffness: 750,
                        type: 'spring'
                    }}
                />
            </_Switch>
            {label && (
                <Label
                    htmlFor={id}
                    size={'normal'}
                >
                    {label}
                </Label>
            )}
        </Container>
    );
});

Switch.displayName = 'Switch';
