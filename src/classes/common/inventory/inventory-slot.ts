import { v4 } from 'uuid';

import { T_GridCoords, T_GridSize } from 'classes/generic/grid/types';

import { T_InventoryItem } from './types';

export class CL_InventorySlot {
    id: string;
    size: T_GridSize;

    constructor(
        public item: T_InventoryItem,
        public ownerId: string,
        public coords: T_GridCoords[],
        public isRotated = false,
    ) {
        this.id = v4();
        this.item = item;
        this.size = item.size;

        if (isRotated) this.rotate();
    }

    rotate() {
        this.isRotated = !this.isRotated;
        this.size = [this.size[1], this.size[0]];
    }
}
