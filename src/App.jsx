import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Banners from "./pages/Banners";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Categories from "./pages/Categories"

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Root route - redirect based on auth status */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth/login" replace />} />

        {/* Auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected Admin Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/admin/banners" element={<Banners />} />        
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;