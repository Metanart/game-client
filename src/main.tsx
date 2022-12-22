import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'components/app/app';

import 'components/game/game';
import 'scss/static/reset.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
