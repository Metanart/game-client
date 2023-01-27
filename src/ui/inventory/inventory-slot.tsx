import { FC, ReactNode } from 'react';

import { styles } from './inventory-slot.styles';

type T_Props = {
    children?: ReactNode;
};

export const UI_InventorySlot: FC<T_Props> = (props) => {
    const { children } = props;

    return <div css={styles.root}>{children}</div>;
};
