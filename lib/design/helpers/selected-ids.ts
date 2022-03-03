export const toSelectedIds = (options: HTMLCollectionOf<HTMLOptionElement>): number[] =>
    Array.from(options, (option) => Number(option.value));
