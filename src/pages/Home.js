import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 style={{ margin: "50px", fontSize: "50px" }}>Welcome to TodoList</h1>
      <Link style={{ margin: "50px", fontSize: "50px" }} to="/login">
        Login
      </Link>
      <Link style={{ margin: "50px", fontSize: "50px" }} to="/register">
        Register
      </Link>
    </div>
  );
}
