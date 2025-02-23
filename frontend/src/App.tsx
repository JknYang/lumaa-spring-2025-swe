import React, { useState } from 'react';
import Login from './components/login';
import Register from './components/register';
import TaskManager from './components/taskmanager';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <nav>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button onClick={() => setShowLogin(false)}>Register</button>
          </>
        )}
      </nav>
      <main>
        {isAuthenticated ? (
          <TaskManager />
        ) : showLogin ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Register onRegister={() => setShowLogin(true)} />
        )}
      </main>
    </div>
  );
};

export default App;
