import { iterateMethod } from 'utils/iterate-method';

export class List<TGListItem> {
    list: TGListItem[] = [];

    constructor(items?: TGListItem[]) {
        if (items?.length) this.addItems(items);
    }

    getItemIndex(requestedItem: TGListItem): number {
        if (this.list.length === 0) return -1;
        return this.list.findIndex((item) => item === requestedItem);
    }

    getItemsIndexes(
        items: TGListItem[],
        isExact = false,
    ): number[] | undefined {
        if (this.list.length === 0) return;

        const results = items
            .map((item) => this.getItemIndex(item))
            .filter((item) => item !== -1) as number[];

        if (isExact && results.length !== items.length) return;

        return results.length > 0 ? results : undefined;
    }

    addItem(item: TGListItem): TGListItem {
        this.list.push(item);
        return item;
    }

    addItems(items: TGListItem[]): TGListItem[] {
        return iterateMethod<TGListItem>(
            items,
            this.addItem.bind(this),
        ) as TGListItem[];
    }

    addUniqueItem(item: TGListItem): TGListItem | undefined {
        if (this.getItemIndex(item) >= 0) return;
        return this.addItem(item);
    }

    addUniqueItems(items: TGListItem[]): TGListItem[] | undefined {
        return iterateMethod<TGListItem>(
            items,
            this.removeItemByIndex.bind(this),
        );
    }

    removeItemByIndex(index: number): TGListItem | undefined {
        if (this.list.length === 0) return;
        const removedItem = this.list.splice(index, 1)[0];
        return removedItem;
    }

    removeItemsByIndexes(indexes: number[]): TGListItem[] | undefined {
        if (this.list.length === 0) return;

        return iterateMethod<number, TGListItem>(
            indexes,
            this.removeItemByIndex.bind(this),
        );
    }

    removeItem(item: TGListItem): TGListItem | undefined {
        if (this.list.length === 0) return;

        const itemIndex = this.getItemIndex(item);

        if (itemIndex === -1) return;

        return this.removeItemByIndex(itemIndex);
    }

    removeItems(items: TGListItem[]): TGListItem[] | undefined {
        if (this.list.length === 0) return;

        return iterateMethod<TGListItem>(items, this.removeItem.bind(this));
    }
}
