import { Collection } from 'classes/generic/collection';
import { EGridCellStatus } from 'classes/generic/grid/enums';
import { Grid } from 'classes/generic/grid/grid';
import { TGridCell, TGridCoords, TGridSize } from 'classes/generic/grid/types';

import { iterateMethod } from 'utils/iterate-method';

import { InventorySlot } from './inventory-slot';
import { TInventoryItem } from './types';

export class Inventory {
    public grid: Grid<TGridCell>;
    public collection: Collection<InventorySlot>;

    constructor(size: TGridSize, public ownerId: string) {
        this.grid = new Grid(size);
        this.collection = new Collection<InventorySlot>();
    }

    storeItem(item: TInventoryItem): InventorySlot | false {
        const foundCoords = this.findCoords(item.size);

        if (!foundCoords.list.length) return false;

        const newSlot = new InventorySlot(
            item,
            this.ownerId,
            foundCoords.list,
            foundCoords.isRotated,
        );

        this.grid.updateCellsByCoords(newSlot.coords, {
            status: EGridCellStatus.BUSY,
        });

        return this.collection.addItem(newSlot);
    }

    storeItems(items: TInventoryItem[]): InventorySlot[] | undefined {
        return iterateMethod<TInventoryItem, InventorySlot>(
            items,
            this.storeItem.bind(this),
        );
    }

    removeSlot(slot: InventorySlot): InventorySlot | undefined {
        const slotIndex = this.collection.getItemIndex(slot);

        if (!slotIndex) return undefined;

        this.grid.updateCellsByCoords(this.collection.list[slotIndex].coords, {
            status: EGridCellStatus.EMPTY,
        });

        return this.collection.removeItemByIndex(slotIndex);
    }

    removeSlots(slots: InventorySlot[]): InventorySlot[] | undefined {
        return iterateMethod<InventorySlot>(slots, this.removeSlots.bind(this));
    }

    findCoords(itemSize: TGridSize): {
        list: TGridCoords[];
        isRotated: boolean;
    } {
        let foundCoords: TGridCoords[] = [];

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
