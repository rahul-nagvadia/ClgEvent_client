import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import CanvasJSReact from '@canvasjs/react-charts';
import '../styles/Leaderboard.css'; // Import your CSS file for animations


const { CanvasJSChart } = CanvasJSReact;


const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [mostWinsCollegeId, setMostWinsCollegeId] = useState("");
  const [winner, setWinner] = useState("");
  const [showWinnerAnimation, setShowWinnerAnimation] = useState(false);


  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/clg/leaderboard', {
          method: 'POST',
        });
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error.message);
      }
    };


    fetchLeaderboard();
  }, []);


  useEffect(() => {
    const fetchWinner = async () => {
      try {
        const response = await fetch('http://localhost:5000/clg/getWinner', {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data)
        setWinner(data.winner.clg_name);
      } catch (error) {
        console.error('Error fetching Winner:', error.message);
      }
    };


    fetchWinner();
  }, []);


  const pieChartData = leaderboard.map((clg) => ({
    y: clg.wins,
    label: clg.clg.clg_name,
  }));


  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2",
    title: {
      text: "Wins Distribution by College"
    },
 
    data: [{
      type: "pie",
      indexLabel: "{label}: {y} points",
      startAngle: -90,
      dataPoints: pieChartData
    }]
  };




  const setWinnerCollege = async () => {
    // console.log(leaderboard);
    const x = leaderboard[0].clg.clg_name;
    setMostWinsCollegeId(x);
    console.log(leaderboard[0].clg.clg_name);
    console.log(mostWinsCollegeId)
    const response = await fetch(
      `http://localhost:5000/clg/declarewinner/${mostWinsCollegeId}`, {
          method: 'POST',
    });
    let data = await response.json();
    if(data.success){
      setWinner(leaderboard[0].clg.clg_name);
      setShowWinnerAnimation(true);
    }
    else{
      window.alert("Winner not Saved");
    }
   
  };
 


  return (
    <Layout>


      <div className="container mt-4">
        {
          winner && (
          <div className='text-center'>
              <h2>The Winner of this year Event is <span style={{color : "blue"}}>{winner} 🏆</span></h2>
          </div>
          )}
        <h1 className="mb-4">Leaderboard</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">College</th>
              <th scope="col">Total Matches</th>
              <th scope="col">Total Wins</th>
              <th scope="col">Total Loses</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((clg) => (
              <tr key={clg._id}>
                <td>{clg.clg.clg_name}</td>
                <td>{clg.total_matches}</td>
                <td>{clg.wins}</td>
                <td>{clg.loses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="container mt-4">
        <h1 className="mb-4">LeaderBoard Representation as Pie Chart</h1>
        <CanvasJSChart options={options} />
      </div>


      <div className="container mt-4">
        <button onClick={setWinnerCollege} className="btn btn-primary">
          Declare the winner of This Year.
        </button>
      </div>


      {showWinnerAnimation && (
        <div className="winner-animation">
         
          <h2>Congratulations to the Winner!</h2>
          <p>{winner} is the winner!</p>
        </div>
      )}
    </Layout>
  );
};


export default Leaderboard;