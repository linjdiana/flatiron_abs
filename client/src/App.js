import './App.css';
import styled from 'styled-components'
import {Switch, Route} from "react-router-dom";
import TrainerContainer from './Components/TrainerContainer';
import Login from './Components/Login';
import Home from "./Components/Home";
import { useState, useEffect } from 'react';

function App() {
  const [ trainers, setTrainers ] = useState([])
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/trainers")
    .then((response) => response.json())
    .then((trainerData) => {
      setTrainers(trainerData)
    })
  }, [])

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="App">
      <div className="container">
      <article>
          <h1>What is Flat & Iron Abs Gym? </h1>
          Flat & Iron Abs is a gym located in the Bay Area. This is created by three software engineers from the Flatiron School.  
          <a
            href="https://blog.logrocket.com/create-responsive-navbar-react-css/"
            target="_blank"
            rel="noreferrer"
          >
             Please watch a video tutorial.
          </a>
        </article>
      <Switch>
        <Route path="/trainers">
          <TrainerContainer trainers={trainers} />
        </Route>
        <Route exact path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
      <Route exact path="/">
          <Home />
      </Route>
      </div>
    </div>
  );
}

export default App;
