import { T_GridSize } from 'classes/generic/grid/types';

export type T_InventoryItem = {
    id: number;
    size: T_GridSize;
};

export type T_InventoryCell = {
    id: string;
    ownerId: string;
};

export type T_InventorySlot = {};
