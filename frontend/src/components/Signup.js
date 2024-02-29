import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(e);
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { username, email, password } = user;

    try {
      const response = await axios.post(
        "/register",
        // "https://projectdemobackend1.onrender.com/register",
        { username, email, password }
      );
      alert(response.data.message);
      history.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred");
      }
      console.error(error);
    }
  };

  return (
    <>
      <section className="sign-in">
        <form onSubmit={PostData}>
          <div className="form-group" class="mb-2 row mt-2 m-1">
            <label htmlFor="username" className="col-sm-1 col-form-label">
              Username
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="username"
                id="username"
                value={user.username}
                onChange={handleInputs}
                placeholder="enter your username"
              />
            </div>
          </div>

          <div className="form-group" class="mb-2 row m-1">
            <label htmlFor="email" className="col-sm-1 col-form-label">
              Email
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputs}
                placeholder="enter your email ID"
              />
            </div>
          </div>

          <div className="form-group" class="mb-3 row mb-2 m-1">
            <label htmlFor="password" className="col-sm-1 col-form-label">
              Password
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInputs}
                placeholder="enter your password"
              />
            </div>
          </div>
          <div className="col-auto m-3 mb-4 mt-1">
            <button type="submit" className="form-submit custom-button">
              Register
            </button>
          </div>
        </form>
      </section>

      <NavLink to="/home"> I am already registered</NavLink>
    </>
  );
};

export default Signup;
