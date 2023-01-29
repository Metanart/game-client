import { CSSProperties, FC } from 'react';

import { T_GridSize } from 'classes/generic/grid/types';

import { T_Position } from 'types/generic';

import { styles } from './inventory-slot-backdrop.styles';

type T_Props = {
    size: T_GridSize;
    cellSize: number;
    position: T_Position;
};

export const UI_InventorySlotBackdrop: FC<T_Props> = (props) => {
    const {
        size: [height, width],
        cellSize,
        position: [top, left],
    } = props;

    const staticStyle = {
        height: height * cellSize,
        width: width * cellSize,
    };

    const dynamicStyle: CSSProperties = {
        transform: `translate3d(${left}px, ${top}px, 0)`,
    };

    return (
        <div css={styles.root} style={{ ...staticStyle, ...dynamicStyle }} />
    );
};
