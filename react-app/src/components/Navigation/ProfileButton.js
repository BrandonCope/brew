import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);




  return (
    <div className="profileContainer">
      <button className="profileButton" onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && (

        <ul className="profile-dropdown">
          <div className='loggedInUserNav'>
            <li className="profileItem">Hello, {user.username.slice(0, 10)}!</li>
            <li className="profileItem" ><Link className="profileLink" to={`/profiles/${user.id}`}>My Profile</Link></li>
            <li className="profileItem">
              <LogoutButton className='logout-button' />
            </li>
          </div>
        </ul>

      )}
    </div>
  );
}

export default ProfileButton;
