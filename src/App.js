import React,{useState} from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/LoginComponent/Login';
import SignUp from './Components/LoginComponent/SignUp';
import Dashboard from './Components/Dashboard';
import Calendar from './Components/Calendar';
import Remainder from './Components/Remainder';
import ProgressAnalytics from './Components/ProgressAnaytics';
import Addgoal from './Components/Addgoal';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [goals, setGoals] = useState([]);

  const handleAddGoal = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  return (
    <Router>
    
      <Container>
        <Routes>
           <Route path="/" element={<Home goals={goals} setGoals={setGoals}/>}  />
           <Route path="/login" element={<Login/>} />
           <Route path="/signup" element={<SignUp/>} />
           <Route path="/addgoal" element={<Addgoal onAddGoal={handleAddGoal}/>} />
           <Route path="/dashboard" element={<Dashboard/>} />
           <Route path="/remainder" element={<Remainder/>} />
           <Route path="/Calendar" element={<Calendar/>} />
           <Route path="/progressanalytics" element={<ProgressAnalytics/>} />
        </Routes>
      </Container>
    </Router>
  );
}
const Container=styled.div``;
export default App;
