import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand mx-5" to="/">
      Employee
    </Link>
    <Link className="navbar-brand mx-5" to="/department_list">
      Department
    </Link>
  </nav>
);
