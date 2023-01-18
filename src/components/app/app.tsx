import { FC } from 'react';

import { Game } from 'components/game/game';

import styles from './app.module.scss';

import 'keyboard-control/initialize';

export const App: FC = () => {
    return (
        <div className={styles.root}>
            <Game />
        </div>
    );
};
