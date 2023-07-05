import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import ContextProvider from './context/userContext.tsx';
import Router from './routes/Route.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <Router />
    </ContextProvider>
  </React.StrictMode>
);
