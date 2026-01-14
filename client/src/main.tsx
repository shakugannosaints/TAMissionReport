import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle GitHub Pages SPA redirect
// This script restores the correct URL from the 404.html redirect
(function() {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, '', redirect);
  }
})();

// Parse the redirect from 404.html query string format
(function() {
  const l = window.location;
  if (l.search[1] === '/') {
    const decoded = l.search.slice(1).split('&').map(s => s.replace(/~and~/g, '&')).join('?');
    window.history.replaceState(null, '',
      l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
