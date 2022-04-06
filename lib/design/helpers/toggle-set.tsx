export class ToggleSet<T> extends Set<T> {
    static fromArray<A>(items: A[]): ToggleSet<A> {
        return new ToggleSet<A>(items)
    }

    toggle(item: T): ToggleSet<T> {
        if (this.has(item)) {
            this.delete(item);
        } else {
            this.add(item);
        }

        return this;
    }

    toArray(): T[] {
        return Array.from(this);
    }
}
