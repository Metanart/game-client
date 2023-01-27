import { CSSProperties, FC, ReactNode, useState } from 'react';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { E_DragItem } from 'enums/drag-n-drop';

import { UI_InventorySlot } from 'ui/inventory/inventory-slot';

type T_Props = {
    id: string;
    top: number;
    left: number;
    children?: ReactNode;
};

export const CN_InventorySlot: FC<T_Props> = (props) => {
    const { id, top, left, children } = props;

    const [position, setPosition] = useState({
        top,
        left,
    });

    const prevPosition = useRef({ position });

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: E_DragItem.InventorySlot,
            item: {
                updatePosition: (offsetTop: number, offsetLeft: number) => {
                    const newTop =
                        prevPosition.current.position.top + offsetTop;
                    const newLeft =
                        prevPosition.current.position.left + offsetLeft;

                    prevPosition.current.position = {
                        top: newTop,
                        left: newLeft,
                    };

                    setPosition({
                        top: newTop,
                        left: newLeft,
                    });
                },
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [id, top, left],
    );

    const inlineStyle: CSSProperties = {
        position: 'absolute',
        transform: `translate3d(${position.left}px, ${position.top}px, 0)`,
        opacity: isDragging ? '0.5' : '1',
        cursor: 'move',
    };

    return (
        <div ref={dragRef} style={inlineStyle}>
            <UI_InventorySlot>{children}</UI_InventorySlot>
        </div>
    );
};
