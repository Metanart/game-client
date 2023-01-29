import { CSSProperties, forwardRef } from 'react';

import { TK_Grey } from 'tokens/colors';

import { E_InventoryCellVariant } from './enums';
import { styles } from './inventory-cell.styles';

type T_Props = {
    variant?: E_InventoryCellVariant;
    isHovered?: boolean;
};

const mapVariantToColor = {
    [E_InventoryCellVariant.EMPTY]: TK_Grey[50],
    [E_InventoryCellVariant.BUSY]: TK_Grey[100],
    [E_InventoryCellVariant.DAMAGED]: TK_Grey[200],
};

export const UI_InventoryCell = forwardRef<HTMLDivElement, T_Props>(
    (props, ref) => {
        const { variant = E_InventoryCellVariant.EMPTY, isHovered } = props;

        const inlineStyle: CSSProperties = {
            opacity: isHovered ? 1 : 0.5,
            backgroundColor: mapVariantToColor[variant],
        };

        return <div ref={ref} css={styles.root} style={inlineStyle} />;
    },
);
