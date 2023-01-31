import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Meta, StoryFn } from '@storybook/react';

import { T_Size } from 'types/generic';

import { CN_Inventory } from './inventory';
import { CN_InventorySlot } from './inventory-slot';

export default {
    component: CN_Inventory,
} as Meta<typeof CN_Inventory>;

const size: T_Size = [6, 12];
const cellSize = 32;

const Template: StoryFn<typeof CN_Inventory> = () => (
    <DndProvider backend={HTML5Backend}>
        <CN_Inventory size={size} cellSize={cellSize}>
            <CN_InventorySlot cellSize={cellSize} />
        </CN_Inventory>
    </DndProvider>
);

export const Default = Template.bind({});
