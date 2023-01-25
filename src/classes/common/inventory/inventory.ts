import { CL_Collection } from 'classes/generic/collection';
import { E_GridCellStatus } from 'classes/generic/grid/enums';
import { CL_Grid } from 'classes/generic/grid/grid';
import {
    T_GridCell,
    T_GridCoords,
    T_GridSize,
} from 'classes/generic/grid/types';

import { iterateMethod } from 'utils/iterate-method';

import { CL_InventorySlot } from './inventory-slot';
import { T_InventoryItem } from './types';

export class Inventory {
    public grid: CL_Grid<T_GridCell>;
    public collection: CL_Collection<CL_InventorySlot>;

    constructor(size: T_GridSize, public ownerId: string) {
        this.grid = new CL_Grid(size);
        this.collection = new CL_Collection<CL_InventorySlot>();
    }

    storeItem(item: T_InventoryItem): CL_InventorySlot | false {
        const foundCoords = this.findCoords(item.size);

        if (!foundCoords.list.length) return false;

        const newSlot = new CL_InventorySlot(
            item,
            this.ownerId,
            foundCoords.list,
            foundCoords.isRotated,
        );

        this.grid.updateCellsByCoords(newSlot.coords, {
            status: E_GridCellStatus.BUSY,
        });

        return this.collection.addItem(newSlot);
    }

    storeItems(items: T_InventoryItem[]): CL_InventorySlot[] | undefined {
        return iterateMethod<T_InventoryItem, CL_InventorySlot>(
            items,
            this.storeItem.bind(this),
        );
    }

    removeSlot(slot: CL_InventorySlot): CL_InventorySlot | undefined {
        const slotIndex = this.collection.getItemIndex(slot);

        if (!slotIndex) return undefined;

        this.grid.updateCellsByCoords(this.collection.list[slotIndex].coords, {
            status: E_GridCellStatus.EMPTY,
        });

        return this.collection.removeItemByIndex(slotIndex);
    }

    removeSlots(slots: CL_InventorySlot[]): CL_InventorySlot[] | undefined {
        return iterateMethod<CL_InventorySlot>(
            slots,
            this.removeSlots.bind(this),
        );
    }

    findCoords(itemSize: T_GridSize): {
        list: T_GridCoords[];
        isRotated: boolean;
    } {
        let foundCoords: T_GridCoords[] = [];

        const [requestedHeight, requestedWidth] = itemSize;

        foundCoords = this.grid.findCoords({
            requestedHeight,
            requestedWidth,
        });

        if (foundCoords.length) {
            return { list: foundCoords, isRotated: false };
        }

        foundCoords = this.grid.findCoords({
            requestedHeight: requestedWidth,
            requestedWidth: requestedHeight,
        });

        if (foundCoords.length) {
            return { list: foundCoords, isRotated: true };
        }

        return { list: [], isRotated: false };
    }
}
