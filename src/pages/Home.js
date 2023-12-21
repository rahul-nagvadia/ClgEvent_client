import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { jwtDecode } from "jwt-decode";

const CollegeList = () => {
  const [college, setCollege] = useState({});
  const [userid, setUserid] = useState();
  const [userClg, setUserClg] = useState({})

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.user.id;
        setUserid(id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  },[userid]);

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

  useEffect(() => {

    const fetchCollegeById = async () => {
      try {
        const response = await fetch(`http://localhost:5000/clg/getCollege/${userid}`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log('College received from the server:', data);

        if (data) {
          // console.log(data);
          // console.log(data.clg);
          setUserClg(data);
        } else {
          console.error('No college data found in the response:', data);
        }
      } catch (error) {
        console.error('Error fetching colleges:', error.message);
      }
    };

    fetchCollegeById();
  }, [userid]);


  return (
    <>
      <Layout orgClgId={college._id}>
        <h1>Organizer College</h1>

        <div>
          <h4>College Name: {college.clg_name}</h4><br />
          <h4>City: {college.city}</h4><br />
          <h4>Email: {college.email}</h4><br />
          <h4>Mobile Number: {college.mobile_no}</h4><br />
        </div>

        <h1>User College</h1>

        <div>
          <h4>College Name: {userClg.clg_name}</h4><br />
          <h4>City: {userClg.city}</h4><br />
          <h4>Email: {userClg.email}</h4><br />
          <h4>Mobile Number: {userClg.mobile_no}</h4><br />
        </div>
      </Layout>
    </>
  );
};

export default CollegeList;
