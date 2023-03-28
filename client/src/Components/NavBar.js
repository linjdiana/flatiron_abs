import Reviews from './Reviews'
import Calendar from './Calendar'
import TrainerContainer from './TrainerContainer'
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Home from './Home';

function NavBar() {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
  
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          <NavLink exact to='/home'>
          Flat & Iron Abs
          </NavLink>
        </a>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            <li>
              {/* <a href="/calendar">Calendar</a> */}
              <NavLink exact to="/workouts">
                Calendar
              </NavLink>
            </li>
            <li>
              {/* <a href="/trainers">Trainers</a> */}
              <NavLink exact to="/trainers">
                Trainers
              </NavLink>
            </li>
            <li>
              <a href="/reviews">Reviews</a>
            </li>
            <li>
                <a href="/login">Log In</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  
export default NavBar