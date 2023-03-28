import './App.css';
import NavBar from './Components/NavBar'
import Home from './Components/Home'
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
      <Home />
      <div className="container">
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