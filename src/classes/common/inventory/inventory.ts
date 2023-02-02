import { CL_Area } from 'classes/generic/area/area';
import { CL_Collection } from 'classes/generic/collection/collection';
import { E_GridCellStatus } from 'classes/generic/grid/enums';
import { CL_Grid } from 'classes/generic/grid/grid';
import { T_GridCell } from 'classes/generic/grid/types';

import { T_Coords, T_Size } from 'types/generic';

import { CL_InventorySlot } from './inventory-slot';
import { T_InventoryItem } from './types';

import { iterateMethod } from 'utils/iterate-method';

export class CL_Inventory {
    public grid: CL_Grid<T_GridCell>;
    public collection: CL_Collection<CL_InventorySlot>;

    constructor(size: T_Size, public ownerId: string) {
        this.grid = new CL_Grid(size);
        this.collection = new CL_Collection<CL_InventorySlot>();
    }

    storeItem(item: T_InventoryItem): CL_InventorySlot | false {
        const foundCoords = this.findCoords(item.size);

        if (!foundCoords.results.length) return false;

        const newSlot = new CL_InventorySlot(
            item,
            this.ownerId,
            foundCoords.results,
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

        this.grid.updateCellsByCoords(this.collection.items[slotIndex].coords, {
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

    findCoords(size: T_Size): {
        results: T_Coords[];
        isRotated: boolean;
    } {
        let foundCoords: T_Coords[] = [];

        const [requestedHeight, requestedWidth] = size;

        foundCoords = this.grid.findCoords(new CL_Area(size));

        if (foundCoords.length) {
            return { results: foundCoords, isRotated: false };
        }

        foundCoords = this.grid.findCoords(
            new CL_Area([requestedWidth, requestedHeight]),
        );

        if (foundCoords.length) {
            return { results: foundCoords, isRotated: true };
        }

        return { results: [], isRotated: false };
    }
}
