import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from 'ui/app/app.module.scss';

import 'control/initialize';
import { CN_Game } from 'containers/game/game';

export const CN_App: FC = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.root}>
                <CN_Game />
            </div>
        </DndProvider>
    );
};
