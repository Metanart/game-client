import { FC } from 'react';

import { Game } from 'components/game/game';

import styles from './app.module.scss';

export const App: FC = () => {
    return (
        <div className={styles.root}>
            <Game />
        </div>
    );
};
