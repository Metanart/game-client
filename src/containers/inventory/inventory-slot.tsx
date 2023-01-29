import { FC, Fragment, ReactNode, useRef, useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';

import { T_GridSize } from 'classes/generic/grid/types';

import { E_DragItem } from 'enums/drag-n-drop';

import { T_DragItem } from 'types/drag-n-drop';
import { T_Position } from 'types/generic';

import { snapToGrid } from 'utils/snap-to-grid';

import { UI_InventorySlot } from 'ui/inventory/inventory-slot';
import { UI_InventorySlotBackdrop } from 'ui/inventory/inventory-slot-backdrop';

type T_Props = {
    size?: T_GridSize;
    cellSize?: number;
    position?: T_Position;
    children?: ReactNode;
};

type T_State = {
    position: T_Position;
    backdropPosition: T_Position;
};

export const CN_InventorySlot: FC<T_Props> = (props) => {
    const { position = [0, 0], size = [2, 2], cellSize = 32, children } = props;

    const [state, setState] = useState<T_State>({
        position,
        backdropPosition: position,
    });

    const prevState = useRef(state);

    const handleHover = (offset: T_Position) => {
        const newHoverPosition: T_Position = [
            prevState.current.backdropPosition[0] + offset[0],
            prevState.current.backdropPosition[1] + offset[1],
        ];

        const newState: T_State = {
            position: newHoverPosition,
            backdropPosition: snapToGrid(newHoverPosition, cellSize),
        };

        console.log(newState);

        setState(newState);
    };

    const handleDrop = (offset: T_Position) => {
        const { position } = prevState.current;

        const newPosition: T_Position = [
            position[0] + offset[0],
            position[1] + offset[1],
        ];

        const newState: T_State = {
            position: snapToGrid(newPosition, cellSize),
            backdropPosition: snapToGrid(newPosition, cellSize),
        };

        prevState.current = newState;
        setState(newState);
    };

    const handleDndCollect = (monitor: DragSourceMonitor<T_DragItem>) => ({
        isDragging: !!monitor.isDragging(),
    });

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: E_DragItem.InventorySlot,
            item: {
                onDrop: handleDrop,
                onHover: handleHover,
            },
            collect: handleDndCollect,
        }),
        [],
    );

    return (
        <Fragment>
            <UI_InventorySlotBackdrop
                size={size}
                cellSize={cellSize}
                position={state.backdropPosition}
            />
            <UI_InventorySlot
                ref={dragRef}
                size={size}
                cellSize={cellSize}
                position={prevState.current.position}
                isDragging={isDragging}
            >
                {children}
            </UI_InventorySlot>
        </Fragment>
    );
};
