import { StrictMode } from 'react'
//StrictMode is a wrapper component that helps identify potential problems in an application. It doesn't render anything visible to the user, but it activates additional checks and warnings for its children components.
import { createRoot } from 'react-dom/client'
//createRoot is used to create a root object for rendering a React application.
import App from './App.jsx'
//App is the main component of the application.
import './index.css'
//rendering the React application into the HTML page.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//The code sets up the entry point for the React application. It uses createRoot to create a root container in the div with id="root" and renders the App component inside it. The App component is wrapped with StrictMode to enable additional checks and warnings during development. This is the starting point where the React app is attached to the DOM and becomes interactive in the browser.