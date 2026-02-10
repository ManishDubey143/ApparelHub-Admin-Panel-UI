import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="text-center mb-4">Admin Panel</h4>

      <ul className="nav nav-pills flex-column gap-2">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-white">
            Dashboard
          </NavLink>
        </li>   
        <li className="nav-item">
          <NavLink to="/admin/banners" className="nav-link text-white">
            Banners
          </NavLink>
        </li>   
        <li className="nav-item">
          <NavLink to="/admin/products" className="nav-link text-white">
            Products
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/orders" className="nav-link text-white">
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/categories" className="nav-link text-white">
            Categories
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/users" className="nav-link text-white">
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
