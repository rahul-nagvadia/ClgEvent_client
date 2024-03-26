import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

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

  return (
    <Layout>
      <div className="container mt-4">
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
    </Layout>
  );
};

export default Leaderboard;
