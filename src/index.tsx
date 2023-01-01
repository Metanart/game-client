import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from 'components/app/app';

import 'scss/static/reset.css';

const appRoot = document.getElementById('app-root') as HTMLElement;

ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
