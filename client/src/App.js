import './App.css';
import {Switch, Route} from "react-router-dom";
import TrainerContainer from './Components/TrainerContainer';
import Authentication from './Components/Authentication';
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import NotFound from './Components/NotFound';
import Calendar from './Components/Calendar';
import AddReview from './Components/AddReview';
import { useState, useEffect } from 'react';


function App() {
  const [trainers, setTrainers ] = useState([]);
  const [user, setUser] = useState(null);
  const [ workouts, setWorkouts ] = useState([]);
  const [ reviews, setReviews ] = useState([])
  
  useEffect(() => {
    fetch("/authorized")
    .then(response => {
      if(response.ok) {
        response.json().then(user =>setUser(user))
      } else {
        setUser(null)
      }
    })
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
      <NavBar/>
      <Authentication updateUser={updateUser}/>
    </>
  )

  return (
    <div className="App">
      <div className="container">
      <NavBar updateUser={updateUser}/>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path="/trainers">
          <TrainerContainer trainers={trainers} />
        </Route>
        <Route path="/workouts" >
          <Calendar workouts={workouts} />
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
