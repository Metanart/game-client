import { TGridSize } from 'classes/generic/grid/types';

export type TInventoryItem = {
    id: number;
    size: TGridSize;
};

export type TInventoryCell = {
    id: string;
    ownerId: string;
};

export type TInventorySlot = {};
