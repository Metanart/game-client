import { CSSProperties, forwardRef, ReactNode } from 'react';

import { TK_Spacing } from 'tokens/spacing';

import { T_Position, T_Size } from 'types/generic';

import { styles } from './inventory-slot.styles';

type T_Props = {
    position: T_Position;
    size?: T_Size;
    cellSize?: number;
    children?: ReactNode;
    isDragging?: boolean;
};

export const UI_InventorySlot = forwardRef<HTMLDivElement, T_Props>(
    (props, ref) => {
        const {
            size: [height, width] = [1, 1],
            cellSize = TK_Spacing.xlg,
            position: [top, left],
            children,
            isDragging,
        } = props;

        const staticStyle = {
            height: height * cellSize,
            width: width * cellSize,
        };

        const dynamicStyle: CSSProperties = {
            transform: `translate3d(${left}px, ${top}px, 0)`,
            opacity: isDragging ? '0.2' : '1',
        };

        return (
            <div
                ref={ref}
                css={styles.root}
                style={{ ...staticStyle, ...dynamicStyle }}
            >
                {children}
            </div>
        );
    },
);
