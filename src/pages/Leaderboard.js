import React, { useEffect, useState, useRef } from 'react';
import Layout from './Layout';
import CanvasJSReact from '@canvasjs/react-charts';
import { Bar } from 'react-chartjs-2';

const { CanvasJSChart } = CanvasJSReact;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const chartRef = useRef(null);

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

  // const collegeNames = leaderboard.map(clg => clg.clg.clg_name);
  // const totalMatches = leaderboard.map(clg => clg.total_matches);
  // const totalWins = leaderboard.map(clg => clg.wins);
  // const totalLoses = leaderboard.map(clg => clg.loses);

  // useEffect(() => {
  //   // Clean up when component unmounts
  //   return () => {
  //     if (chartRef.current) {
  //       chartRef.current.destroy(); // Destroy the chart instance
  //     }
  //   };
  // }, []);

  // Data for the chart
  // const data = {
  //   labels: collegeNames,
  //   datasets: [
  //     {
  //       label: 'Total Matches',
  //       data: totalMatches,
  //       backgroundColor: 'rgba(54, 162, 235, 0.5)',
  //       borderColor: 'rgba(54, 162, 235, 1)',
  //       borderWidth: 1,
  //     },
  //     {
  //       label: 'Total Wins',
  //       data: totalWins,
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       borderWidth: 1,
  //     },
  //     {
  //       label: 'Total Loses',
  //       data: totalLoses,
  //       backgroundColor: 'rgba(255, 206, 86, 0.5)',
  //       borderColor: 'rgba(255, 206, 86, 1)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };



  return (
    <Layout>

      <div className="container mt-4" >
        <h1 className="mb-4">Leaderboard</h1>
        {/* <table className="table">
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
        </table> */}
      </div>

      {/* <div style={{ height: '500px' }}>
        <Bar data={data} options={options1} />
      </div> */}

      <div className="container mt-4">
        <h1 className="mb-4">LeaderBoard Representation as Pie Chart</h1>
        <CanvasJSChart options={options} ref={chartRef} />
      </div>

    </Layout>
  );
};

export default Leaderboard;
