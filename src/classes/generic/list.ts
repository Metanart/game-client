import { iterateMethod } from 'utils/iterate-method';

export class CL_List<TG_ListItem> {
    list: TG_ListItem[] = [];

    constructor(items?: TG_ListItem[]) {
        if (items?.length) this.addItems(items);
    }

    getItemIndex(requestedItem: TG_ListItem): number {
        if (this.list.length === 0) return -1;
        return this.list.findIndex((item) => item === requestedItem);
    }

    getItemsIndexes(
        items: TG_ListItem[],
        isExact = false,
    ): number[] | undefined {
        if (this.list.length === 0) return;

        const results = items
            .map((item) => this.getItemIndex(item))
            .filter((item) => item !== -1) as number[];

        if (isExact && results.length !== items.length) return;

        return results.length > 0 ? results : undefined;
    }

    addItem(item: TG_ListItem): TG_ListItem {
        this.list.push(item);
        return item;
    }

    addItems(items: TG_ListItem[]): TG_ListItem[] {
        return iterateMethod<TG_ListItem>(
            items,
            this.addItem.bind(this),
        ) as TG_ListItem[];
    }

    addUniqueItem(item: TG_ListItem): TG_ListItem | undefined {
        if (this.getItemIndex(item) >= 0) return;
        return this.addItem(item);
    }

    addUniqueItems(items: TG_ListItem[]): TG_ListItem[] | undefined {
        return iterateMethod<TG_ListItem>(
            items,
            this.removeItemByIndex.bind(this),
        );
    }

    removeItemByIndex(index: number): TG_ListItem | undefined {
        if (this.list.length === 0) return;
        const removedItem = this.list.splice(index, 1)[0];
        return removedItem;
    }

    removeItemsByIndexes(indexes: number[]): TG_ListItem[] | undefined {
        if (this.list.length === 0) return;

        return iterateMethod<number, TG_ListItem>(
            indexes,
            this.removeItemByIndex.bind(this),
        );
    }

    removeItem(item: TG_ListItem): TG_ListItem | undefined {
        if (this.list.length === 0) return;

        const itemIndex = this.getItemIndex(item);

        if (itemIndex === -1) return;

        return this.removeItemByIndex(itemIndex);
    }

    removeItems(items: TG_ListItem[]): TG_ListItem[] | undefined {
        if (this.list.length === 0) return;

        return iterateMethod<TG_ListItem>(items, this.removeItem.bind(this));
    }
}
