import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Remainder() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Fetch data from MongoDB when the component mounts
    axios.get('http://localhost:3001/api/goals')
      .then(response => setGoals(response.data))
      .catch(error => console.error(error));
  }, []);

  // Function to calculate the time difference in days
  const calculateDaysDifference = (endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const currentDate = new Date();
    const goalEndDate = new Date(endDate);
    const differenceInDays = Math.round((goalEndDate - currentDate) / oneDay);
    return differenceInDays;
  };

  // Filter goals that are within one week of the end date
  const getReminders = () => {
    const oneWeek = 7;
    return goals.filter(goal => calculateDaysDifference(goal.endDate) <= oneWeek);
  };

  return (
    <Container>
    <h2>Reminders</h2>
    {getReminders().map(goal => (
      <div key={goal._id} className='box'>
        <p>A reminder to complete your {goal.goalName}. The last date is {new Date(goal.endDate).toLocaleDateString()}</p>
        <h5>{goal.status}</h5>
      </div>
    ))}
  </Container>
  


  );
}
const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color:white;
  }

  div {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
   display:flex;
    p {
      font-size: 16px;
      margin: 0;
    }
    h5{
      margin-left: auto;
    }
  }
`;
export default Remainder;