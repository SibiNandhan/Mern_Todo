import React, { useState } from "react";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  function changeHandler(e) {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  }
  async function submitHandler() {
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...loginDetails,
      }),
    });
    const data = await response.json();
    if (data.user) {
      alert("Login Successfull");
      localStorage.setItem("token", data.user);
      window.location.href = "/todo";
    }
  }

  return (
    <div>
      <input
        placeholder="email"
        id="email"
        name="email"
        type="email"
        onChange={changeHandler}
      ></input>
      <input
        placeholder="password"
        type="text"
        name="password"
        id="password"
        onChange={changeHandler}
      ></input>
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}
