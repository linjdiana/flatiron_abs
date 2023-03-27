import './App.css';
import NavBar from './Components/NavBar'
import styled from 'styled-components'
import {Switch, Route} from "react-router-dom";
import TrainerContainer from './Components/TrainerContainer';
import { useState, useEffect } from 'react';

function App() {
  const [ trainers, setTrainers ] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/trainers")
    .then((response) => response.json())
    .then((trainerData) => {
      setTrainers(trainerData)
    })
  }, [])

  return (
    <div className="App">
      <NavBar />
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
      </Switch>
      </div>
    </div>
  );
}

export default App;

const Image = styled.img.attrs(() => ({
  src:'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80', 
}))`
  position: absolute;
  z-index:-1;
`