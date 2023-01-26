import { iterateMethod } from 'utils/iterate-method';

export class CL_List<GT_ListItem> {
    list: GT_ListItem[] = [];

    constructor(items?: GT_ListItem[]) {
        if (items?.length) this.addItems(items);
    }

    getItemIndex(requestedItem: GT_ListItem): number {
        if (this.list.length === 0) return -1;
        return this.list.findIndex((item) => item === requestedItem);
    }

    getItemsIndexes(
        items: GT_ListItem[],
        isExact = false,
    ): number[] | undefined {
        if (this.list.length === 0) return;

        const results = items
            .map((item) => this.getItemIndex(item))
            .filter((item) => item !== -1) as number[];

        if (isExact && results.length !== items.length) return;

        return results.length > 0 ? results : undefined;
    }

    addItem(item: GT_ListItem): GT_ListItem {
        this.list.push(item);
        return item;
    }

    addItems(items: GT_ListItem[]): GT_ListItem[] {
        return iterateMethod<GT_ListItem>(
            items,
            this.addItem.bind(this),
        ) as GT_ListItem[];
    }

    addUniqueItem(item: GT_ListItem): GT_ListItem | undefined {
        if (this.getItemIndex(item) >= 0) return;
        return this.addItem(item);
    }

    addUniqueItems(items: GT_ListItem[]): GT_ListItem[] | undefined {
        return iterateMethod<GT_ListItem>(
            items,
            this.removeItemByIndex.bind(this),
        );
    }

    removeItemByIndex(index: number): GT_ListItem | undefined {
        if (this.list.length === 0) return;
        const removedItem = this.list.splice(index, 1)[0];
        return removedItem;
    }

    removeItemsByIndexes(indexes: number[]): GT_ListItem[] | undefined {
        if (this.list.length === 0) return;

        return iterateMethod<number, GT_ListItem>(
            indexes,
            this.removeItemByIndex.bind(this),
        );
    }

    removeItem(item: GT_ListItem): GT_ListItem | undefined {
        if (this.list.length === 0) return;

        const itemIndex = this.getItemIndex(item);

        if (itemIndex === -1) return;

        return this.removeItemByIndex(itemIndex);
    }

    removeItems(items: GT_ListItem[]): GT_ListItem[] | undefined {
        if (this.list.length === 0) return;

        return iterateMethod<GT_ListItem>(items, this.removeItem.bind(this));
    }
}
