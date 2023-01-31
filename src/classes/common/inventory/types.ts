import { T_Size } from 'types/generic';

export type T_InventoryItem = {
    id: number;
    size: T_Size;
};

export type T_InventoryCell = {
    id: string;
    ownerId: string;
};

export type T_InventorySlot = {};
