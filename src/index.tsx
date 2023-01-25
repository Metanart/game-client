import React from 'react';
import ReactDOM from 'react-dom/client';

import 'scss/static/reset.css';
import { CN_App } from 'containers/app/app';

const appRoot = document.getElementById('app-root') as HTMLElement;

ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
        <CN_App />
    </React.StrictMode>,
);
