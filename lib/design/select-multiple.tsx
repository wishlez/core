import {ChangeEvent, FormEvent, forwardRef, KeyboardEvent, ReactNode, SelectHTMLAttributes, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Option, WithInputError, WithInputProps} from '../../types/input';
import {Badge} from './badge';
import {useForm} from './form';
import {getRandomId} from './helpers/randomizer';
import {inputFocusStyles, InputInteractive} from './input';
import {Label} from './label';
import {Note} from './note';

type Props = WithInputProps<SelectHTMLAttributes<HTMLSelectElement>>;

const _Select = styled.select`
    display: none;
`;

const InputContainer = styled(InputInteractive.withComponent('div'))<WithInputError>`
    display: flex;
    flex-wrap: wrap;
    padding: 0;

    &:focus-within {
        ${inputFocusStyles}
    }
`;

const Input = styled.input`
    border: none;
    background-color: var(--mono-900);
    flex-grow: 1;
    outline: none;
    padding: var(--control-padding);
`;

const getOptions = (children: ReactNode): Option[] => [].concat(children).map((child) => ({
    label: child.props.children,
    value: child.props.value.toString()
}));

export const SelectMultiple = forwardRef<HTMLSelectElement, Props>(({label, note, error, ...props}, ref) => {
    const inputId = getRandomId('input');
    const dataListId = getRandomId('datalist');

    const [options, setOptions] = useState<Option[]>([]);
    const [invalid, setInvalid] = useState<boolean>(false);
    const [selectedIds, setSelectedIds] = useState<string[]>(props.defaultValue as string [] || []);
    const inputRef = useRef<HTMLInputElement>();
    const formRef = useForm();

    useEffect(() => {
        setOptions(getOptions(props.children));
    }, [props.children]);

    useEffect(() => {
        const handleReset = () => setSelectedIds([]);
        const current = formRef?.current;

        current?.addEventListener('reset', handleReset);

        return () => current?.removeEventListener('reset', handleReset);
    }, [formRef]);

    const handleInvalid = (event: FormEvent<HTMLSelectElement>) => {
        event.preventDefault();
        setInvalid(true);
        props.onInvalid?.(event);
    };

    const handleInput = (event: FormEvent<any>) => {
        setInvalid(false);
        props.onSelect?.(event);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedLabel = event.target.value;
        const selectedValue = options.find(({label}) => label === selectedLabel)?.value;

        if (selectedValue) {
            setSelectedIds((ids) => ids.concat(selectedValue));

            inputRef.current.value = '';
            inputRef.current.focus();
        }
    };

    const removeBadge = (value: string) => {
        setSelectedIds((ids) => ids.filter((id) => id !== value));
    };

    const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (inputRef.current.value === '' && selectedIds.length > 0 && event.key === 'Backspace') {
            setSelectedIds((ids) => ids.slice(0, ids.length - 1));
        }
    };

    return (
        <div>
            {label && (
                <Label htmlFor={inputId}>
                    {label}
                </Label>
            )}
            <_Select
                {...props}
                defaultValue={undefined}
                disabled
                multiple={true}
                onInvalid={handleInvalid}
                ref={ref}
                value={selectedIds}
            />
            <InputContainer
                hasError={invalid || Boolean(error)}
            >
                {selectedIds
                    .map((value) => options.find((option) => option.value === value))
                    .filter((value) => value)
                    .map(({label, value}) => (
                        <Badge
                            key={value}
                            onClick={() => removeBadge(value)}
                        >
                            {label}
                        </Badge>
                    ))}
                {selectedIds.length !== options.length && (
                    <Input
                        id={inputId}
                        list={dataListId}
                        onChange={handleChange}
                        onInput={handleInput}
                        onKeyDown={handleKeydown}
                        placeholder={props.placeholder}
                        ref={inputRef}
                        type={'text'}
                    />
                )}
                <datalist id={dataListId}>
                    {options
                        .filter(({value}) => !selectedIds.includes(value))
                        .map(({label, value}) => (
                            <option
                                key={value}
                                value={label}
                            />
                        ))}
                </datalist>
            </InputContainer>
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

SelectMultiple.displayName = 'SingleSelect';
