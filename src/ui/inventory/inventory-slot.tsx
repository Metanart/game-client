import { FC, ReactNode } from 'react';

import { T_GridSize } from 'classes/generic/grid/types';

import { TK_Spacing } from 'tokens/spacing';

import { styles } from './inventory-slot.styles';

type T_Props = {
    size?: T_GridSize;
    cellSize?: number;
    children?: ReactNode;
};

export const UI_InventorySlot: FC<T_Props> = (props) => {
    const {
        size: [height, width] = [1, 1],
        cellSize = TK_Spacing.xlg,
        children,
    } = props;

    return (
        <div
            css={styles.root}
            style={{ height: height * cellSize, width: width * cellSize }}
        >
            {children}
        </div>
    );
};
