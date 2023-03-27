import Reviews from './Reviews'
import Calendar from './Calendar'
import TrainerContainer from './TrainerContainer'
import { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";

function NavBar({updateUser}) {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const history = useHistory();
    const handleLogout = () => {
      fetch("/logout", {
        method: "DELETE",
      }).then(res => {
        if(res.ok){
            updateUser(null)
            history.push('/authentication')
        }
      })
   }

    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          Flat & Iron Abs
        </a>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        >
          {/* icon from Heroicons.com */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul>
            <li>
              <a href="/calendar">Calendar</a>
            </li>
            <li>
              {/* <a href="/trainers">Trainers</a> */}
              <NavLink exact to="/trainers">
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/reviews">Reviews</NavLink>
            </li>
            <li>
                <NavLink exact to="/authentication">Log In/Signup</NavLink>
            </li>
            <li onClick={handleLogout}> Logout </li>
          </ul>
        </div>
      </nav>
    );
  }
  
export default NavBar