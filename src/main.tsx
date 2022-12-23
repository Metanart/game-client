import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'components/app/app';

import 'scss/static/reset.css';
import 'utils/init-game';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
