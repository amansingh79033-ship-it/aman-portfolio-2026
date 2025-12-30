import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log('Mounting Aman Archive platform...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Root element not found");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('App successfully rendered to DOM');
} catch (error) {
  console.error('Failed to render App:', error);
}
