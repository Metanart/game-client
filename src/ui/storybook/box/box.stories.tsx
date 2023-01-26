import { Meta, StoryFn } from '@storybook/react';

import { SB_Box } from './box';

export default {
    component: SB_Box,
} as Meta<typeof SB_Box>;

const Template: StoryFn<typeof SB_Box> = () => <SB_Box>Test</SB_Box>;

export const Default = Template.bind({});
