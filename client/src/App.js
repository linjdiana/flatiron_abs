import './App.css';
import Home from './Components/Home'
import styled from 'styled-components'

function App() {
  return (
    <div className="App">
      <h1>would you like abs</h1>
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