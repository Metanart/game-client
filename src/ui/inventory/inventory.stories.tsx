import { Meta, StoryFn } from '@storybook/react';

import { T_GridSize } from 'classes/generic/grid/types';

import { UI_Inventory } from './inventory';
import { UI_InventorySlot } from './inventory-slot';

export default {
    component: UI_Inventory,
} as Meta<typeof UI_Inventory>;

const size: T_GridSize = [6, 12];

const Template: StoryFn<typeof UI_Inventory> = () => (
    <UI_Inventory size={size}>
        <UI_InventorySlot />
    </UI_Inventory>
);

export const Default = Template.bind({});
