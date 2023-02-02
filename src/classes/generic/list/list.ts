import { iterateMethod } from 'utils/iterate-method';

// @TODO
// check if the list items should be immutable for some methods
// or investigate npm data-strcutures and use them instead

export class CL_List<GT_ListItem> {
    items: GT_ListItem[] = [];

    constructor(items?: GT_ListItem[]) {
        if (items?.length) this.addItems(items);
    }

    // It's better to keep -1 as a negative return,
    // because resturning undefined here
    // could overlap with a 0 index in later checks -
    // (!index) could be 0 and undefined
    getItemIndex(requestedItem: GT_ListItem): number {
        return this.items.findIndex((item) => item === requestedItem);
    }

    addItem(item: GT_ListItem): GT_ListItem {
        this.items.push(item);
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
        return iterateMethod<GT_ListItem>(items, this.addUniqueItem.bind(this));
    }

    removeItemByIndex(index: number): GT_ListItem | undefined {
        return this.items.splice(index, 1)[0];
    }

    removeItem(item: GT_ListItem): GT_ListItem | undefined {
        const itemIndex = this.getItemIndex(item);

        if (itemIndex === -1) return;

        return this.removeItemByIndex(itemIndex!);
    }

    removeItems(items: GT_ListItem[]): GT_ListItem[] | undefined {
        // I'm adding this check only here,
        // because it's not worthin to use the same check on singular calls
        if (this.items.length === 0) return;
        return iterateMethod<GT_ListItem>(items, this.removeItem.bind(this));
    }
}
