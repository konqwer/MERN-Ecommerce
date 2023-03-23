import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import useUser from './hooks/useUser';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const { user, isLoading, logout } = useUser();

  return (
    !isLoading && (
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="mx-auto w-full max-w-screen-2xl grow p-2">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        </div>
      </div>
    )
  );
};

export default App;
