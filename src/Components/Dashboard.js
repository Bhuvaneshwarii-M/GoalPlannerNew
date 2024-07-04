import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Dashboard = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Fetch goals from the server
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);

  // Function to count goals based on status
  const countGoalsByStatus = (status) => {
    return goals.filter((goal) => goal.status === status).length;
  };

  return (
    <DashboardContainer>
     
      <LeftContainer>
            <LeftTopContent>
                 <Link to="/remainder">Remainder</Link>
                 <Link to="/calendar">Calendar</Link>
                 <Link to="/dashboard">Dashboard</Link>
                 <Link to="/progressanalytics">Progress Analytics</Link>
            </LeftTopContent>
      </LeftContainer>
      <RightContainer>
        <p>Goals Completed: {countGoalsByStatus('completed')}</p>
        <p>Goals In Progress: {countGoalsByStatus('inProgress')}</p>
        <p>Goals Yet to Start: {countGoalsByStatus('yetToStart')}</p>
        </RightContainer>
      </DashboardContainer>
    
  );
};
const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: black;
  gap:3%;
  color:white;
`;

const LeftContainer = styled.div`
  width: 20%;
  height: 100vh;
  background-color: #74F0ED; 
  list-style:none; /* Yellow background */
  `;

  const LeftTopContent=styled.div`
  padding-left: 10%;
  margin-top:33%;
 display:flex;
 flex-direction:column;
 gap:9px;

`;

  const RightContainer = styled.div`
  width: 75%;
  height: 100%;
`;
export default Dashboard;
