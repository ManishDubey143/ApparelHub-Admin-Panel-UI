
import { logout } from "../auth/Login";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <span className="navbar-brand fw-bold">Dashboard</span>

      <button className="btn btn-outline-danger btn-sm"   onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
