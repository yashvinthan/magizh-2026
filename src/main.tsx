import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThematicProvider } from './context/ThematicContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThematicProvider>
      <App />
    </ThematicProvider>
  </StrictMode>,
);
