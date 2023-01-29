import { FC, useState } from 'react';
import { useDrop } from 'react-dnd';

import { E_DragItem } from 'enums/drag-n-drop';

import { UI_InventoryCell } from 'ui/inventory/inventory-cell';

export const CN_InventoryCell: FC = (props) => {
    const [isHoveredState, setIsHoveredState] = useState(false);

    return <UI_InventoryCell isHovered={isHoveredState} />;
};
