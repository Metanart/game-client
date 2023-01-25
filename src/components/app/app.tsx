import { FC } from 'react';

import { CM_Game } from 'components/game/game';

import styles from 'ui/app/app.module.scss';

import 'control/initialize';

export const CM_App: FC = () => {
    return (
        <div className={styles.root}>
            <CM_Game />
        </div>
    );
};
