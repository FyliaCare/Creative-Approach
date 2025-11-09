import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { reportWebVitals } from './utils/reportWebVitals';
import { registerServiceWorker } from './utils/registerServiceWorker';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Start measuring performance
reportWebVitals();

// Register service worker for PWA functionality
if (import.meta.env.PROD) {
  registerServiceWorker();
}
