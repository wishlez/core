import {FormEvent, forwardRef, SelectHTMLAttributes, useState} from 'react';
import styled from 'styled-components';
import {WithInputProps} from '../../types/input';
import {Box} from './box';
import {getRandomId} from './helpers/randomizer';
import {InputInteractive} from './input';
import {Label} from './label';
import {Note} from './note';

type Props = WithInputProps<SelectHTMLAttributes<HTMLSelectElement>>;

const SelectContainer = styled(Box)`
    --select-arrow-box-size: 2em;
    --select-arrow-size: calc(var(--select-arrow-box-size) / 4);
    position: relative;
`;

const SelectArrow = styled.span`
    border-style: solid;
    border-width: 0 2px 2px 0;
    position: absolute;
    height: var(--select-arrow-size);
    width: var(--select-arrow-size);
    right: var(--control-padding-x);
    top: calc(50% - var(--select-arrow-size));
    transform: rotate(45deg);
`;

const _Select = styled(InputInteractive.withComponent('select'))`
    appearance: none;
    display: block;
    padding-right: calc(var(--select-arrow-box-size) + var(--control-padding-x));
    width: 100%;
`;

export const SelectSingle = forwardRef<HTMLSelectElement, Props>(({label, note, error, ...props}, ref) => {
    const [invalid, setInvalid] = useState<boolean>(false);
    const id = props.id || getRandomId('select');

    const handleInvalid = (event: FormEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setInvalid(true);
        props.onInvalid?.(event);
    };

    const handleSelect = (event: FormEvent<HTMLSelectElement>) => {
        setInvalid(false);
        props.onSelect?.(event);
    };

    return (
        <Box>
            {label && (
                <Label htmlFor={id}>
                    {label}
                </Label>
            )}
            <SelectContainer>
                <_Select
                    {...props}
                    hasError={invalid || Boolean(error)}
                    id={id}
                    multiple={undefined}
                    onInvalid={handleInvalid}
                    onSelect={handleSelect}
                    ref={ref}
                />
                <SelectArrow/>
            </SelectContainer>
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
        </Box>
    );
});

SelectSingle.displayName = 'SelectSingle';
