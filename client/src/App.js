import './App.css';
import './index.css';
import {createGlobalStyle} from 'styled-components';
import {Switch, Route} from "react-router-dom";
import TrainerContainer from './Components/TrainerContainer';
import Authentication from './Components/Authentication';
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import NotFound from './Components/NotFound';
import Calendar from './Components/Calendar';
import AddReview from './Components/AddReview';
import { useState, useEffect } from 'react';
import Signups from './Components/Signups';

function App() {
  const [trainers, setTrainers ] = useState([]);
  const [user, setUser] = useState(null);
  const [ workouts, setWorkouts ] = useState([]);
  const [ reviews, setReviews ] = useState([])
  const [ signUps, setSignUps ] = useState([])
    
  useEffect(() => {
      fetch("http://localhost:3000/signups")
      .then(response => response.json())
      .then(signUpData => setSignUps(signUpData)) 
  }, [])

  useEffect(() => {
    fetch("/trainers")
    .then((response) => response.json())
    .then((trainerData) => {
      setTrainers(trainerData)
    })
  }, [])

  useEffect(() => {
    fetch("/workouts")
    .then((response) => response.json())
    .then((workoutData) => {
      setWorkouts(workoutData)
    })
  }, [])

  useEffect(() => {
    fetch("/reviews")
    .then((response) => response.json())
    .then((reviewData) => {
      setReviews(reviewData)
    })
  }, [])



  const updateUser = (user) => setUser(user)
  if(!user) return (
    <>
      <GlobalStyle />
      <NavBar/>
      <Authentication updateUser={updateUser}/>
    </>
  )

  return (
    <div className="App">
      <div className="container">
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path="/trainers">
          <TrainerContainer trainers={trainers} />
        </Route>
        <Route path="/workouts" >
          <Calendar workouts={workouts} signUps={signUps} setSignUps={setSignUps} />
        </Route>
        <Route path="/signups" >
          <Signups signUps={signUps} setSignUps={setSignUps} />
        </Route>
        <Route path='/authentication'>
          <Authentication updateUser={updateUser}/>
        </Route>
        <Route path='/notfound'>
            <NotFound />
        </Route>
        <Route path='/reviews'>
          <AddReview reviews={reviews} workouts={workouts} />
        </Route>
      </Switch>
      </div>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
    body{
      background-color: yellow; 
      color:black;
    }
    `
