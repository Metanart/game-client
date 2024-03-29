import React from 'react';
import ReactDOM from 'react-dom/client';

import { CN_App } from 'containers/app/app';

import 'scss/static/reset.css';

const appRoot = document.getElementById('app-root') as HTMLElement;

ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
        <CN_App />
    </React.StrictMode>,
);
