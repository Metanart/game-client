import { describe, expect, test } from 'vitest';

import { CL_Collection } from './collection';

type Item = { id: number; ownerId: number; name: string };

const items = [
    { id: 1, ownerId: 0, name: 'Jack' },
    { id: 2, ownerId: 0, name: 'John' },
    { id: 3, ownerId: 0, name: 'Ivan' },
];

const uniqueItems = [
    { id: 4, ownerId: 0, name: 'Jack' },
    { id: 5, ownerId: 0, name: 'John' },
    { id: 6, ownerId: 0, name: 'Ivan' },
];

describe('Collection', () => {
    describe('Add items', () => {
        test('Add generic items', () => {
            const collection = new CL_Collection<Item>(items);
            const result = collection.addItem(items[0]);
            expect(collection.items.length).toBe(4);
            collection.addItems(items);
            expect(collection.items.length).toBe(7);
        });

        test('Add unique items', () => {
            const collection = new CL_Collection<Item>(items);
            collection.addItems(uniqueItems);
            expect(collection.items.length).toBe(6);
        });
    });
    describe('Get items', () => {
        test('Get an item by id', () => {
            const collection = new CL_Collection<Item>(items);
            const item = collection.getItemByProperty(3);
            expect(item?.name).toBe('Ivan');
        });
        test('Get an item by name', () => {
            const collection = new CL_Collection<Item>(items);
            const item = collection.getItemByProperty('Ivan', 'name');
            expect(item?.id).toBe(3);
        });
    });
    describe('Remove items', () => {
        test('Remove item by id', () => {
            const collection = new CL_Collection<Item>(items);
            collection.removeItemByProperty(1);
            expect(collection.items[0].id).not.toBe(1);
        });
        test('Remove item by name', () => {
            const collection = new CL_Collection<Item>(items);
            collection.removeItemByProperty('Jack', 'name');
            expect(collection.items[0].id).not.toBe('Jack');
        });
        test('Remove item by index', () => {
            const collection = new CL_Collection<Item>(items);
            collection.removeItemByIndex(0);
            expect(collection.items[0].id).not.toBe('Jack');
        });
    });
    describe('Error cases', () => {
        test('Add unique items', () => {
            const collection = new CL_Collection<Item>(items);
            collection.addUniqueItem(items[0]);
            expect(collection.items.length).toBe(3);
            collection.addUniqueItems(items);
            expect(collection.items.length).toBe(3);
        });
        test('Get an item by id', () => {
            const collection = new CL_Collection<Item>(items);
            const item = collection.getItemByProperty(333);
            expect(item).toBeUndefined();
        });
        test('Get an item by name', () => {
            const collection = new CL_Collection<Item>(items);
            const item = collection.getItemByProperty('Vasyan', 'name');
            expect(item).toBeUndefined();
        });
    });
});
