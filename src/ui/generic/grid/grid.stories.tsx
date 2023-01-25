import { UI_Grid } from './grid';
import { UI_GridCell } from './grid-cell';

export default {
    title: 'UI/Generic/Grid',
    component: UI_Grid,
};

export const Default = () => (
    <UI_Grid>
        <UI_GridCell>Text</UI_GridCell>
    </UI_Grid>
);
