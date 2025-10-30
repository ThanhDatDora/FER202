import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
      >
        Trang Chủ
      </NavLink>
      <NavLink
        to="/san-pham"
        className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
      >
        Sản Phẩm
      </NavLink>
      <NavLink
        to="/lien-he"
        className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
      >
        Liên Hệ
      </NavLink>
    </nav>
  );
}
