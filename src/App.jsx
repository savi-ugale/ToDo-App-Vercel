// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Remove BrowserRouter
import Login from './Pages/Login.jsx';
import SignUp from './Pages/SignUp.jsx';
import TodoPage from './Pages/TodoPage.jsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/todos" replace />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />
      <Route
        path="/signup"
        element={<SignUp setIsAuthenticated={setIsAuthenticated} />}
      />
      {/* Protect the Todo page */}
      <Route
        path="/todos"
        element={
          isAuthenticated ? (
            <TodoPage setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
