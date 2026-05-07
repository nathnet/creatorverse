import { Link, NavLink } from "react-router";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <Link to="/" className="navbar-brand">
            Creatorverse
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/" end>
            View Creators
          </NavLink>
        </li>
        <li>
          <NavLink to="/new">
            Add Creator
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
