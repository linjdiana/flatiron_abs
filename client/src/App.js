import './App.css';
import {createGlobalStyle} from 'styled-components';
import {Switch, Route} from "react-router-dom";
import TrainerContainer from './Components/TrainerContainer';
import Authentication from './Components/Authentication';
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
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
        <Route exact path='/authentication'>
          <Authentication updateUser={updateUser}/>
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

const GlobalStyle = createGlobalStyle`
    body{
      background-color: yellow; 
      color:black;
    }
    `
