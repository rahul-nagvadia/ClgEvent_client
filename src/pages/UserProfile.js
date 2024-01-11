import React, { useEffect, useState } from 'react'
import Layout from './Layout';
import { jwtDecode } from 'jwt-decode';

export default function UserProfile() {

    const [user, setUser] = useState({ username: "", password: "", email: "", mobile_no: "", city: "" });
    

    const [userid, setUserId] = useState('')


    useEffect(() => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {

            try {
                const decodedToken = jwtDecode(authToken);
                console.log(decodedToken.user.id)
                setUserId(decodedToken.user.id);
                console.log(userid);

            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [userid]);

    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const res = await fetch(`http://localhost:5000/clg/getClgDetails/${userid}`, {
                method : 'POST' 
            });
            const data = await res.json();
            const user = { username: data.clg.username, password: "", email: data.clg.email, mobile_no: data.clg.mobile_no, city: data.clg.city }
            setUser(user);
          } catch (error) {
            console.error('Error While Fetching:', error.message);
          }
        };
    
        if (userid) {
          fetchUserDetails();
        }
      }, [userid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        try {
            const response = await fetch('http://localhost:5000/clg/userUpdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user
                }),
            });
            if (response.status === 400) {
                window.alert("Your College have already participated in this event");
            }
            if (response.status === 300) {
                window.alert("Succesfully Participated!!");
            }

            if (!response.ok) {
                throw new Error('Failed to add participants');
            }

            // Reset the form after successful submission
            setUser({ username: "", password: "", email: "", mobile_no: "", city: "" });
        } catch (error) {
            console.error('Error submitting participants:', error.message);
        }
    }

    return (
        <Layout>
            <div>
                <div className="container mt-5">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title text-center mb-1">Update User Details</h4>
                                {/* <hr className="w-50 mx-auto" /> */}
                                <hr className='mb-3' style={{ width: "50%", height: "3px", margin: "auto", color: "gray" }} />
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            value={user.username}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            PassWord
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={user.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="mobiler" className="form-label">
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="mobile"
                                            name="mobile_no"
                                            value={user.mobile_no}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">
                                            City
                                        </label>
                                        <input
                                            type="textarea"
                                            className="form-control"
                                            id="city"
                                            name="city"
                                            value={user.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </Layout>
    )
}
