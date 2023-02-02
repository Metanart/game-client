import { describe, expect, test } from 'vitest';

import { CL_List } from './list';

const listItems: number[] = [1, 2, 3, 4, 5];

describe('List', () => {
    test('Check number of created items', () => {
        const list = new CL_List(listItems);
        expect(list.items.length).toBe(5);
    });

    describe('Add items', () => {
        test('Add a regular item', () => {
            const list = new CL_List(listItems);
            const addedItem = list.addItem(12);
            expect(addedItem).toBe(12);
        });

        test('Add an existing item as unique', () => {
            const list = new CL_List(listItems);
            const addedItem = list.addUniqueItem(5);
            expect(addedItem).toBeUndefined;
        });

        test('Add a anew item as unique', () => {
            const list = new CL_List(listItems);
            const addedItem = list.addUniqueItem(6);
            expect(addedItem).toBe(6);
        });
    });

    describe('Get item', () => {
        test('Get non-existent item index', () => {
            const list = new CL_List(listItems);
            const result = list.getItemIndex(11);
            expect(result).toBeUndefined;
        });

        test('Get existing item index', () => {
            const list = new CL_List(listItems);
            const result = list.getItemIndex(2);
            expect(result).toBe(1);
        });
    });

    describe('Remove items', () => {
        test('Remove items by values', () => {
            const list = new CL_List(listItems);
            const values = list.removeItems([1]);
            expect(list.items.length).toBe(4);
        });

        test('Remove item by index', () => {
            const list = new CL_List(listItems);
            const removedItem = list.removeItemByIndex(0);

            expect(removedItem).toBe(1);
        });
    });
});
