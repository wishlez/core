import {FormEvent, forwardRef, InputHTMLAttributes, useState} from 'react';
import styled, {css} from 'styled-components';
import {WithInputError, WithInputProps} from '../../types/input';
import {getRandomId} from './helpers/randomizer';
import {Label} from './label';
import {Note} from './note';

type Props = WithInputProps<InputHTMLAttributes<HTMLInputElement>> & {
    type: 'text' | 'date' | 'number' | 'password'
};

export const inputFocusStyles = css`
    outline: 2px solid var(--core-500);
    outline-offset: -2px;
`;

export const InputInteractive = styled.input<WithInputError>`
    background-color: var(--mono-900);
    border: none;
    border-bottom: 2px solid var(--mono-100);
    display: block;
    padding: var(--control-padding);
    width: 100%;

    &:focus {
        ${inputFocusStyles}
    }

    & ~ ${Note} {
        margin-top: var(--grid-gap-small);
    }

    ${(props) => props.hasError ? css`
        outline: 2px solid var(--alert-error-500);
        outline-offset: -2px;
    ` : ''}
`;

export const Input = forwardRef<HTMLInputElement, Props>(({label, note, error, ...props}, ref) => {
    const [invalid, setInvalid] = useState<boolean>(false);
    const id = props.id || getRandomId('select');

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
        <div>
            {label && (
                <Label htmlFor={id}>
                    {label}
                </Label>
            )}
            <InputInteractive
                {...props}
                hasError={invalid || Boolean(error)}
                id={id}
                onInput={handleInput}
                onInvalid={handleInvalid}
                ref={ref}
            />
            {!error && note && (
                <Note>
                    {note}
                </Note>
            )}
            {error && (
                <Note color={'danger'}>
                    {error}
                </Note>
            )}
        </div>
    );
});

Input.displayName = 'Input';
