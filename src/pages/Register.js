import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    name: "",
  });

  function changeHandler(e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }
  async function submitHandler() {
    const response = await fetch(
      "https://daily--todolist.herokuapp.com/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...userDetails,
        }),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      history.push("/login");
    }
  }

  return (
    <div>
      <input
        placeholder="name"
        id="name"
        name="name"
        type="text"
        onChange={changeHandler}
      ></input>
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
