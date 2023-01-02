import { FC } from 'react';

import { Game } from 'components/game/game';
import { GameDevtools } from 'components/game/game-devtools';
import { GameLight } from 'components/game/game-ligth';
import { GameMap } from 'components/game/game-map';

import { IS_DEVELOPMENT_MODE } from 'constants/mode';

import styles from './app.module.scss';

export const App: FC = () => {
    return (
        <div className={styles.root}>
            <Game>
                <GameLight />
                <GameMap />
                {IS_DEVELOPMENT_MODE && <GameDevtools />}
            </Game>
        </div>
    );
};
