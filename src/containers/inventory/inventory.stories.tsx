import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { v4 } from 'uuid';

import { Meta, StoryFn } from '@storybook/react';

import { T_GridSize } from 'classes/generic/grid/types';

import { CN_Inventory } from './inventory';
import { CN_InventorySlot } from './inventory-slot';

export default {
    component: CN_Inventory,
} as Meta<typeof CN_Inventory>;

const size: T_GridSize = [6, 12];

const Template: StoryFn<typeof CN_Inventory> = () => (
    <DndProvider backend={HTML5Backend}>
        <CN_Inventory size={size}>
            <CN_InventorySlot id={v4()} top={10} left={10} />
        </CN_Inventory>
    </DndProvider>
);

export const Default = Template.bind({});
