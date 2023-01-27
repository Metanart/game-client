import { Meta, StoryFn } from '@storybook/react';

import { T_GridSize } from 'classes/generic/grid/types';

import { SB_Box } from 'ui/storybook/box/box';

import { UI_Inventory } from './inventory';
import { UI_InventorySlot } from './inventory-slot';

export default {
    component: UI_Inventory,
} as Meta<typeof UI_Inventory>;

const size: T_GridSize = [6, 12];

const renderCell = (rowIndex: number, colIndex: number) => (
    <UI_InventorySlot>{`${rowIndex + 1}:${colIndex + 1}`}</UI_InventorySlot>
);

const cells = [...new Array(size[0])].map((_, rowIndex) => {
    return [...new Array(size[1])].map((_, colIndex) =>
        renderCell(rowIndex, colIndex),
    );
});

const Template: StoryFn<typeof UI_Inventory> = () => (
    <UI_Inventory columns={size[1]}>{cells}</UI_Inventory>
);

export const Default = Template.bind({});
