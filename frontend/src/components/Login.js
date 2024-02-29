import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        // console.log(response);
        alert("Logged in successfully!");
        sessionStorage.setItem("jwt-token", response?.data?.token);
        history.push("/home");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (response.status === 400) {
        alert("Invalid credentials. Please register first to login.");
      } else {
        console.log("An error occurred during login:", response);
      }
    } catch (error) {
      alert(
        "Login failed!Please check your Credentials or Signup first by creating an account"
      );
      console.log(error);
      history.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <section className="sign-up">
        <form method="POST">
          <div className="form-group mb-2 row m-1">
            <label htmlFor="email" className="col-sm-1 col-form-label">
              Email
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email ID"
              />
            </div>
          </div>

          <div className="form-group mb-3 row mb-2 m-1">
            <label htmlFor="password" className="col-sm-1 col-form-label">
              Password
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
              />
            </div>
          </div>

          <div className="col-auto m-3 mb-4 mt-1">
            <button
              type="submit"
              name="signin"
              id="signin"
              className="form-submit custom-button"
              value="Log In"
              onClick={loginUser}
            >
              Login
            </button>
          </div>
        </form>
      </section>

      <NavLink to="/register">Create an Account</NavLink>
    </>
  );
};

export default Login;
