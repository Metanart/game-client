import React from 'react';
import ReactDOM from 'react-dom/client';

import { Game } from 'classes/game/game';

import { App } from 'components/app/app';

import 'scss/static/reset.css';

const appRoot = document.getElementById('app-root') as HTMLElement;
const gameRoot = document.getElementById('game-root') as HTMLElement;

const game = new Game(gameRoot);

ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
