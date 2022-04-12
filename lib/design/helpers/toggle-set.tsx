export class ToggleSet<T> extends Set<T> {
    static fromArray<A>(items: A[]): ToggleSet<A> {
        return new ToggleSet<A>(items);
    }

    toggle(item: T, state: boolean): ToggleSet<T> {
        if (state) {
            this.add(item);
        } else {
            this.delete(item);
        }

        return this;
    }

    toArray(): T[] {
        return Array.from(this);
    }
}
