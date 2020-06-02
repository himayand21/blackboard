import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ToastProvider from './components/toast';

import App from './App';

ReactDOM.render(
    <Router>
        <ToastProvider>
            <App />
        </ToastProvider>
    </Router>,
    document.getElementById('root')
);