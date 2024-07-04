import React,{useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Import necessary dependencies
import { useNavigate } from 'react-router-dom';
function Addgoal({onAddGoal}) {

   const [goal,setGoal]=useState({
    goalName:'',
    description:'',
    startDate:'',
    endDate:'',
    members:'',
    status:'',
   });
   const navigate = useNavigate();
// eslint-disable-next-line
   const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setGoal((prevGoal)=>({ ...prevGoal,[name]:value}));

   };


   const handleAddGoal= async ()=>{
    if (Object.values(goal).every((value) => value !== '')) {
      try {
        // Send a POST request to add the goal
        await axios.post('http://localhost:3001/api/goals', goal);

        // Clear the form fields after successfully adding the goal
        setGoal({
          goalName: '',
          description: '',
          startDate: '',
          endDate: '',
          members: '',
          status:'',
        });

        // Navigate back to the home page
        navigate('/');
      } catch (error) {

          console.error('Error adding goal:', error);
          alert('Error adding goal. Please try again.');
        };
    } else {
      alert('Please fill in all fields');
    }
  };

 

  return (
    <Container>
      <h2>ADD YOUR GOAL</h2>
         <Goalcontainer>
         <label>
          GOAL:
          <input type="text"   name="goalName"  placeholder="Enter your Goal"
            value={goal.goalName}
            onChange={handleInputChange}/>
            
        </label>
        <br />
       
        <label>
          START DATE:
          <input type="date"   name="startDate"
            value={goal.startDate}
            onChange={handleInputChange}/>
        </label>
        <br />
        <label>
          END DATE:
          <input type="date"  name='endDate' value={goal.endDate}
            onChange={handleInputChange}/>
        </label>
        <br />
        
        <label>
          STATUS:
          <select
            name="status"
            value={goal.status}
            style={{ width: '100%' }}
            onChange={handleInputChange} 
          >
            <option value="">Select Status</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="yetToStart">Yet to Start</option>
          </select>
        </label>
        <br />
        <label>
          MEMBERS:
          <input type="text"   name="members" placeholder="Collaborated with"
            value={goal.members}
            onChange={handleInputChange}/>
        </label>
        <br/>
        
        <label>
          DESCRIPTION:
          <input type="text"  name="description" placeholder="Give More Details"
            value={goal.description}
            onChange={handleInputChange} />
            
        </label>
        <br />
        <Addbtn><button type='submit' onClick={ handleAddGoal}>
    ADD GOAL
  </button></Addbtn>

         </Goalcontainer>
    </Container>
  )
}
const Container=styled.div`
width:100%;
height:auto;
margin-left:28%;
h2{
  margin-left:14%;

}
justify-content:center;
margin-top:1%;
`;
const Goalcontainer=styled.div`
width:40%;
border: 1px solid #ddd;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  padding:1%;
  margin:1%;
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  input{
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  /* Style the submit button */
  button {
    margin-left:40%;
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }

`;
const Addbtn=styled.div``;
export default Addgoal;