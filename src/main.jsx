import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import InnerMapApp from './InnerMapApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InnerMapApp />
  </React.StrictMode>,
);
