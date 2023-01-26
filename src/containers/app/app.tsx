import { FC } from 'react';

import styles from 'ui/app/app.module.scss';
import { SB_Box } from 'ui/storybook/box/box';

import 'control/initialize';
import { CN_Game } from 'containers/game/game';

export const CN_App: FC = () => {
    return (
        <div className={styles.root}>
            <SB_Box>Test</SB_Box>
        </div>
    );
};
