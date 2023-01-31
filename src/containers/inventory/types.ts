import { CL_Area } from 'classes/generic/area/area';

import { T_Position } from 'types/generic';

export type T_InventorySlotPosition = {
    slot: T_Position;
};

export type T_InventoryDragItem = {
    handleDrop: (offset: T_Position) => void;
    handleHover: (offset: T_Position) => CL_Area | undefined;
};
