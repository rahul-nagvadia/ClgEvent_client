import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { jwtDecode } from "jwt-decode";

const CollegeList = () => {
  const [college, setCollege] = useState({});
  const [userid, setUserid] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user.id;
        console.log(id)
        setUserid(id);
        console.log(userid)
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  });

  // Use another useEffect to log userid when it changes
  useEffect(() => {
    console.log("User id:", userid);
  }, [userid]);


  useEffect(() => {

    const fetchColleges = async () => {
      try {
        const response = await fetch('http://localhost:5000/clg/getOrganizeCollege', {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log('Data received from the server:', data);

        if (data.clg) {
          // console.log(data);
          // console.log(data.clg);
          setCollege(data.clg);
        } else {
          console.error('No college data found in the response:', data);
        }
      } catch (error) {
        console.error('Error fetching colleges:', error.message);
      }
    };

    fetchColleges();
  }, []);


  return (
    <>
      <Layout orgClgId={college._id}>
        <h1>Colleges</h1>

        <div>
          <h3>College Name:</h3> {college.clg_name}<br />
          <h3>City:</h3> {college.city}<br />
          <h3>Email:</h3> {college.email}<br />
          <h3>Mobile Number:</h3> {college.mobile_no}<br />
        </div>
      </Layout>
    </>
  );
};

export default CollegeList;
