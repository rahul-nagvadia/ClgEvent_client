import React from "react";
import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  let navigate = useNavigate();
  const location = useLocation();
  const [registrationSuccessMessage, setRegistrationSuccessMessage] =
    useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (location.state && location.state.registrationSuccess) {
      setRegistrationSuccessMessage("Registration successful! Please wait until you are verified by higher authority");

      const timeoutId = setTimeout(() => {
        setRegistrationSuccessMessage(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [location.state]);

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { username, password } = user;

    if (!username || !password) {
      window.alert("Please fill all the fields properly");
      navigate("/login");
    } else {
      const res = await fetch("http://localhost:5000/clg/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      

      if (res.status === 401) {
        window.alert("Incorrect username or password");
        navigate("/login");
      } 
      else if (res.status === 402){
        window.alert("You Are still under Verification! please keep Patience  :)");
      } else if (res.status === 200) {
        window.alert("Login Successful!");
        navigate("/Home");
      } else if (res.status === 201) {
        window.alert("Admin login Successful!");
        navigate("/adminhome");
      }
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
          style={{ backgroundColor: "white" }}
        >
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

          <form method="post" className="mx-1 mx-md-4">
            {registrationSuccessMessage && (
              <div className="alert alert-success" role="alert">
                {registrationSuccessMessage}
              </div>
            )}

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  name="username"
                  value={user.username}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="username">
                  Your Username
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button
                type="button"
                className="btn btn-clr btn-primary btn-lg"
                onClick={PostData}
              >
                Login
              </button>
            </div>
            <p className="text-center text-muted mt-5 mb-0">Not Registered Yet?? <a href="/" className="fw-bold text-body"><u>Register here</u></a></p>
          </form>
        </div>
      </div>
    </>
  );
}
