import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import App from "./App"; // Your App component
import './index.css'
import ShopContextProvider from './context/ShopContext'; // Import ShopContextProvider

ReactDOM.render(
  <BrowserRouter>
    <ShopContextProvider>  {/* Wrap the App component with ShopContextProvider */}
      <App />
    </ShopContextProvider>
  </BrowserRouter>,
  document.getElementById("root") // Target the div with id 'root'
);
