// components/Leaderboard.js
import React, { useEffect, useState } from 'react';
import Layout from './Layout';

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
    </Layout>
  );
};

export default Leaderboard;
