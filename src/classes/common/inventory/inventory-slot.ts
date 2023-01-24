import { v4 } from 'uuid';

import { TGridCoords, TGridSize } from 'classes/generic/grid/types';

import { TInventoryItem } from './types';

export class InventorySlot {
    id: string;
    size: TGridSize;

    constructor(
        public item: TInventoryItem,
        public ownerId: string,
        public coords: TGridCoords[],
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
