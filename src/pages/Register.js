import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    clgName: "",
    city: "",
    email: "",
    mobileNo: "",
    rpass: ""
  });
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const handleAgreeCheckbox = () => {
    setAgreed(!agreed);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const {
      username,
      email,
      clgName,
      password,
      rpass,
      city,
      mobileNo,
    } = user;

    if (!agreed) {
      window.alert("Please agree to the terms of service");
      return;
    }

    if (
      !email ||
      !username ||
      !password ||
      !rpass ||
      !clgName ||
      !city ||
      !mobileNo
    ) {
      window.alert("Fill all the fields properly");
    } else {
      if (password !== rpass) {
        window.alert("Password and Repeat password field must match");
      } else {
        const res = await fetch("http://localhost:5000/clg/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            clgName,
            password,
            city,
            mobileNo,
          }),
        });

        const data = await res.json();
        console.log(data);
        localStorage.setItem("username", username);

        if (res.status === 400) {
          window.alert("Try with different username and email");
        } else if (res.status === 401) {
          window.alert("Found error");
        } else if (res.status === 402) {
          window.alert("This College is already Registered...");
        } else {
          window.alert("Registration Successful");
          navigate("/login", { state: { registrationSuccess: true } });
        }
      }
    }
  };

  return (
    <div style={{ "backgroundImage": "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
      <section className="vh-100 bg-image" >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ "borderRadius": 25 }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <form>
                      <div className="form-outline mb-4">
                        <input type="text" id="clgName" className="form-control form-control-lg" name='clgName' value={user.clgName} onChange={handleInputs} />
                        <label className="form-label" htmlFor="clgName">College Name</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="text" id="username" className="form-control form-control-lg" name='username' value={user.username} onChange={handleInputs} />
                        <label className="form-label" htmlFor="username">User Name</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="email" id="email" className="form-control form-control-lg" name='email' value={user.email} onChange={handleInputs} />
                        <label className="form-label" htmlFor="email">Email Address</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="text" id="city" className="form-control form-control-lg" name='city' value={user.city} onChange={handleInputs} />
                        <label className="form-label" htmlFor="city">City</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="text" id="mobileNo" className="form-control form-control-lg" name='mobileNo' value={user.mobileNo} onChange={handleInputs} />
                        <label className="form-label" htmlFor="mobileNo">Mobile No.</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="password" className="form-control form-control-lg" name='password' value={user.password} onChange={handleInputs} />
                        <label className="form-label" htmlFor="password">Password</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="rpass" className="form-control form-control-lg" name='rpass' value={user.rpass} onChange={handleInputs} />
                        <label className="form-label" htmlFor="rpass">Repeat your password</label>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value={agreed} id="form2Example3cg" onChange={handleAgreeCheckbox} />
                        <label className="form-check-label" htmlFor="form2Example3g">
                          I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          onClick={handelSubmit}
                          disabled={!agreed}  // Disable the button if the user has not agreed
                        >
                          Register
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/login" className="fw-bold text-body"><u>Login here</u></a></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
