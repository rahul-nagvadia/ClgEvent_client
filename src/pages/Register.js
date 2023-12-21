import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Register.css';

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

    <div className='container-fluid ' style={{minHeight : "100vh"}}>
      <div className="container-fluid registration-container mt-25">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-25">
            <div className="registration-form mt-25">
              <h2 className="text-center mb-4">Create an account</h2>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <form>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="College Name" name='clgName' value={user.clgName} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="User Name" name='username' value={user.username} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Email Address" name='email' value={user.email} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="City" name='city' value={user.city} onChange={handleInputs} />
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <form>

                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Mobile No." name='mobileNo' value={user.mobileNo} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                      <input type="password" className="form-control" placeholder="Password" name='password' value={user.password} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                      <input type="password" className="form-control" placeholder="Repeat your password" name='rpass' value={user.rpass} onChange={handleInputs} />
                    </div>
                    <div className="form-check mb-4">
                      <input className="form-check-input" type="checkbox" value={agreed} id="agreeCheckbox" onChange={handleAgreeCheckbox} />
                      <label className="form-check-label" htmlFor="agreeCheckbox">
                        I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handelSubmit}
                  disabled={!agreed}
                >
                  Register
                </button>
              </div>
              <p className="text-center text-muted mt-3 mb-0">Have already an account? <a href="/login" className="fw-bold text-body"><u>Login here</u></a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
