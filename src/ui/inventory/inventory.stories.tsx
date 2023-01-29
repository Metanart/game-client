import { Meta, StoryFn } from '@storybook/react';

import { T_GridSize } from 'classes/generic/grid/types';

import { UI_Inventory } from './inventory';
import { UI_InventoryCell } from './inventory-cell';
import { UI_InventorySlot } from './inventory-slot';

export default {
    component: UI_Inventory,
} as Meta<typeof UI_Inventory>;

const size: T_GridSize = [6, 12];
const cellSize = 32;

const Template: StoryFn<typeof UI_Inventory> = () => (
    <UI_Inventory size={size} cellSize={cellSize} cell={<UI_InventoryCell />}>
        <UI_InventorySlot position={[0, 0]} size={[2, 2]} cellSize={cellSize} />
    </UI_Inventory>
);

export const Default = Template.bind({});
