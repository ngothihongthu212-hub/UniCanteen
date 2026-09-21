import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { CanteenProvider } from './context/CanteenContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CanteenProvider>
      <App />
    </CanteenProvider>
  </StrictMode>,
);
