import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart, BarController, LinearScale } from 'chart.js/auto';
import {Link} from 'react-router-dom';

Chart.register(BarController, LinearScale);

const AnalyticsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: black;
  gap:3%;
`;

const StyledChartContainer = styled.div`
  height: 400px;
  width: 600px;
  margin: auto;
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
function ProgressAnalytics() {
  const [goalCounts, setGoalCounts] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/goals');
      const goals = response.data;

      let completedCount = 0;
      let inProgressCount = 0;
      let yetToStartCount = 0;

      goals.forEach(goal => {
        if (goal.status === 'completed') {
          completedCount++;
        } else if (goal.status === 'inProgress') {
          inProgressCount++;
        } else {
          yetToStartCount++;
        }
      });

      setGoalCounts({
        completed: completedCount,
        inProgress: inProgressCount,
        yetToStart: yetToStartCount
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const data = {
    labels: ['Completed', 'In Progress', 'Yet to Start'],
    datasets: [
      {
        label: 'Goal Count',
        data: [goalCounts.completed || 0, goalCounts.inProgress || 0, goalCounts.yetToStart || 0],
        backgroundColor: [
          'rgba(0, 255, 255, 0.6)', // Completed (light blue)
        'rgba(255, 255, 0, 0.6)', // In Progress (yellow)
        'rgba(255, 0, 255, 0.6)'   // Yet to Start (magenta)
        ],
        borderColor: [
          'rgba(0, 255, 255, 1)',
          'rgba(255, 255, 0, 1)',
          'rgba(255, 0, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <AnalyticsContainer>
      <LeftContainer>
            <LeftTopContent>
                 <Link to="/remainder">Remainder</Link>
                 <Link to="/calendar">Calendar</Link>
                 <Link to="/dashboard">Dashboard</Link>
                 <Link to="/progressanalysis">Progress Analytics</Link>
            </LeftTopContent>
      </LeftContainer>
      <StyledChartContainer>
        {goalCounts.completed !== undefined && (
          <Bar
            data={data}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        )}
      </StyledChartContainer>
    </AnalyticsContainer>
  );
}

export default ProgressAnalytics;
