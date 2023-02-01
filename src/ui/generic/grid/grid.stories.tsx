import { Meta, StoryFn } from '@storybook/react';

import { CL_Area } from 'classes/generic/area/area';
import { CL_Grid } from 'classes/generic/grid/grid';

import { SB_Box } from 'ui/storybook/box/box';

import { UI_Grid } from './grid';
import { UI_GridCell } from './grid-cell';

export default {
    component: UI_Grid,
} as Meta<typeof UI_Grid>;

const cellText = 'xs = 2';

const cell = (
    <UI_GridCell xs={2}>
        <SB_Box>{cellText}</SB_Box>
    </UI_GridCell>
);

const cells = [...new Array(8)].map(() => cell);

const Template: StoryFn<typeof UI_Grid> = () => (
    <UI_Grid spacing={2} rowSpacing={4} columns={8}>
        {cells}
    </UI_Grid>
);

export const Default = Template.bind({});
