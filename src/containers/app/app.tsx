import { FC } from 'react';

import styles from 'ui/app/app.module.scss';

import 'control/initialize';
import { CN_Game } from 'containers/game/game';

export const CN_App: FC = () => {
    return (
        <div className={styles.root}>
            <CN_Game />
        </div>
    );
};
