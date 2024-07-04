for calender integration import some libraries
>>>>npm install @fullcalendar/react @fullcalendar/daygrid
1..Customize the Calendar:

You can customize the appearance and behavior of the calendar by referring to the "FullCalendar documentation".


FOR REMAINDER::
>>>>npm install mongoose moment
 we use the moment library to work with dates more conveniently

 >>>>npm install nodemailer
 To send reminders via email, you can use a library like nodemailer to send emails
>>>>npm install stream-browserify





 >>>>>>>>/////////////remainder>>>>>>>>>>>>>>>>>>>>>
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
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #333;
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






>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
>>>>>>....SEND REMAINDER THROUGH EMAIL......>>>>>>>>>>>


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import nodemailer from 'nodemailer';

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

  // Function to send email reminders
  const sendEmailReminder = (goal) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bhuvaneshwari030105@gmail.com', // replace with your Gmail email
        pass: 'bhuvi@05' // replace with your Gmail password
      }
    });

    const mailOptions = {
      from: 'bhuvaneshwari030105@gmail.com',
      to: 'bhuvana.mani00001@gmail.com', // replace with the recipient's email
      subject: `Reminder: Complete your ${goal.goalName}`,
      text: `A reminder to complete your ${goal.goalName}. The last date is ${new Date(goal.endDate).toLocaleDateString()}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };

  // Iterate through reminders and send email reminders
  const sendRemindersViaEmail = () => {
    const reminders = getReminders();
    reminders.forEach((goal) => {
      sendEmailReminder(goal);
    });
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
      <button onClick={sendRemindersViaEmail}>Send Reminders via Email</button>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #333;
  }

  div {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    p {
      font-size: 16px;
      margin: 0;
    }
    h5 {
      margin-left: auto;
    }
  }

  button {
    margin-top: 10px;
    padding: 8px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export default Remainder;



>>>>>.progress analytics correct code

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { Chart, BarController, LinearScale } from 'chart.js/auto';

Chart.register(BarController, LinearScale);

const StyledChartContainer = styled.div`
  height: 400px;
  width: 600px;
  margin: auto;
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
          'rgba(75, 192, 192, 0.6)', // Completed
          'rgba(255, 206, 86, 0.6)', // In Progress
          'rgba(255, 99, 132, 0.6)'   // Yet to Start
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Goal Progress</h2>
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
    </div>
  );
}

export default ProgressAnalytics;
