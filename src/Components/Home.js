import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function Home({ goals, setGoals }) {
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        //fetch goals from server
        const response = await axios.get('http://localhost:3001/api/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, [setGoals]);
  
  return (
    <Container>
      <LeftContainer>
            <LeftTopContent>
                 <Link to="/remainder">Remainder</Link>
                 <Link to="/calendar">Calendar</Link>
                 <Link to="/dashboard">Dashboard</Link>
                 <Link to="/progressanalysis">Progress Analytics</Link>
            </LeftTopContent>
      </LeftContainer>
      <RightContainer>
        <Header>
          <Search>
            <input type="text" placeholder="Enter search term" />
          </Search>
          <AccessBtn>
            <button>Give Access</button>
          </AccessBtn>
          <AddBtn>
            <StyledLink to="/addgoal">+</StyledLink>
          </AddBtn>
        </Header>
        <OurGoals>
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <StyledCard key={index}>
                <Card.Body>
                  <Card.Title>Goal: {goal.goalName}</Card.Title>
                  <Card.Text>Description: {goal.description}</Card.Text>
                  <Card.Text>Start Date: {new Date(goal.startDate).toLocaleDateString()}</Card.Text>
                  <Card.Text>End Date: {new Date(goal.endDate).toLocaleDateString()}</Card.Text>
                  <Card.Text>Members: {goal.members}</Card.Text>
                  <Card.Text>Status: {goal.status}</Card.Text>
                </Card.Body>
              </StyledCard>
            ))
          ) : (
            <p>No goals available.</p>
          )}
        </OurGoals>
      </RightContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: black;
  gap:3%;
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

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 6%;
  margin: 5%;

`;

const Search = styled.div`
  input {
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease; /* Transition border color */
    &:focus {
      border-color: yellow; /* Yellow border when focused */
    }
  }
`;

const AccessBtn = styled.div``;

const AddBtn = styled.div`
  font-size: 40px;
  width: 40px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: yellow; /* Yellow color */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Transition background color and transform */
  &:hover {
    background-color: darkgoldenrod; /* Darken on hover */
    transform: scale(1.1); /* Scale up on hover */
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: yellow; /* Yellow color */
`;

const OurGoals = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const StyledCard = styled(Card)`
  background-color: #EA445A; /* Yellow background */
  border: none;
  transition: box-shadow 0.3s ease; /* Transition box-shadow */
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Shadow on hover */
  }
  color: white;
`;

export default Home;
