import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import useUser from './hooks/useUser';
import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Product from './pages/Product';
import MyProducts from './pages/MyProducts';

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
            <Route
              path="/myProducts"
              element={user ? <MyProducts /> : <Navigate to="/" />}
            />
            <Route
              path="/addProduct"
              element={user ? <AddProduct /> : <Navigate to="/" />}
            />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/" />}
            />
            <Route path=":productName" element={<Product />} />
          </Routes>
        </div>
      </div>
    )
  );
};

export default App;
