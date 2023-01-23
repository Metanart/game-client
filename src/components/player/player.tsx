import { FC } from 'react';

import { EGridCellStatus } from 'classes/generic/grid/enums';
import { Grid } from 'classes/generic/grid/grid';

import { PlayerBody } from './player-body';

const grid = new Grid([12, 9]);

const foundCells1 = grid.findCells([9, 7]);
grid.updateCellsStatus(foundCells1, EGridCellStatus.BUSY);

export const Player: FC = () => <PlayerBody />;
