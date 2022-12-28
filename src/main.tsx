import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'components/app/app';

import { Game } from './classes/game/game';

import 'global/scss/static/reset.css';

const appRoot = document.getElementById('app-root') as HTMLElement;
const gameRoot = document.getElementById('game-root') as HTMLElement;

const game = new Game().renderToDom(gameRoot).run();

ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
