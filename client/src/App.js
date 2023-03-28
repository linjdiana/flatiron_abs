import './App.css';
import {createGlobalStyle} from 'styled-components';
import {Switch, Route} from "react-router-dom";
import TrainerContainer from './Components/TrainerContainer';
import Authentication from './Components/Authentication';
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import NotFound from './Components/NotFound';
import Calendar from './Components/Calendar';
import { useState, useEffect } from 'react';

function App() {
  const [trainers, setTrainers ] = useState([]);
  const [user, setUser] = useState(null);
  const [ workouts, setWorkouts ] = useState([]);

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

  // useEffect(() => {
  //   fetch("http://localhost:3000/trainers")
  //   .then((response) => response.json())
  //   .then((trainerData) => {
  //     setTrainers(trainerData)
  //   })
  // }, [])

  // useEffect(() => {
  //   fetchUser()
  //   fetchTrainers()
  // },[])

  // const fetchTrainers = () => (
  //   fetch('/trainers')
  //   .then(res => res.json())
  //   .then(setTrainers)
  // )

  // const fetchUser = () => (
  //   fetch('/authorized')
  //   .then(res => {
  //     if(res.ok){
  //       res.json()
  //       .then(data => {
  //         setUser(data)
  //       })
  //     } else {
  //       console.log('hi')
  //       setUser(null)
  //     }
  //   })
  // )

  // useEffect(() => {
  //   fetch("/check_session").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

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
        <Route exact path="/">
            <Home />
        </Route>
        <Route path='/notfound'>
            <NotFound />
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
