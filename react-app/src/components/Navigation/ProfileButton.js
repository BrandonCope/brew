import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

function ProfileButton() {
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
      <button onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} className="profileButton" onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
      </button>
      {showMenu && (

        <div onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} onClick={openMenu} className="profile-dropdown">
          <div className='loggedInUserNav'>
            <div className="profileItem" ><Link className="profileLink" to={`/profiles/reviews`}><i className="fa-regular fa-user"></i>My Profile</Link></div>
          </div>
            <div className=""><LogoutButton /></div>
        </div>

      )}
    </div>
  );
}

export default ProfileButton;
