import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Provider from './context/Context';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <Provider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
        ,
    </BrowserRouter>
);
