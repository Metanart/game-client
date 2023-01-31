import { T_Coords, T_Size } from 'types/generic';

import { T_InventoryItem } from './types';

import { v4 } from 'uuid';

export class CL_InventorySlot {
    id: string;
    size: T_Size;

    constructor(
        public item: T_InventoryItem,
        public ownerId: string,
        public coords: T_Coords[],
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
