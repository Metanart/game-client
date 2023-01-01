import { FC } from 'react';

import { Game } from 'components/game/game';
import { GameDevtools } from 'components/game/game-devtools';
import { GameLight } from 'components/game/game-ligth';
import { MapTile } from 'components/map-tile/map-tile';

import { IS_DEVELOPMENT_MODE } from 'constants/mode';

import { Map } from '../map/map';

import styles from './app.module.scss';

export const App: FC = () => {
    return (
        <div className={styles.root}>
            <Game>
                {IS_DEVELOPMENT_MODE && <GameDevtools />}
                <GameLight />
                <Map />
            </Game>
        </div>
    );
};
