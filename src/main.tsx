import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import SSOCallback from './pages/SSOCallback';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    {window.location.pathname === '/sso' ? <SSOCallback /> : <App />}
  </StrictMode>,
);
