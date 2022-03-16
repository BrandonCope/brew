
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
// import LogoutButton from './auth/LogoutButton';

const NavBar = ({ loginForm, setLoginForm }) => {
  const user = useSelector(state => state.session.user)


  let sessionLinks;
  if (user) {
    sessionLinks = (
      <>
        <NavLink to="/" >
          <li>
            <button className='home-button'><i className="fa-solid fa-house"></i></button>
          </li>
        </NavLink>
        <li>
          <button>Host a brewery</button>
          {/* <CreateImageModal /> */}
        </li>
        <li>
          <ProfileButton user={user} />
        </li>
      </>
    )
  } else {
    sessionLinks = (
      <>
       <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        {/* <LoginModal loginForm={loginForm} setLoginForm={setLoginForm} />
        <SignupModal loginForm={loginForm} setLoginForm={setLoginForm} /> */}
      </>
    )

  }
  return (
    <nav>
          <NavLink to='/' activeClassName='active'>
            <h2>Brew</h2>
          </NavLink>
      <ul>
        {sessionLinks}
        {/* <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        {/* <li>
          <ProfileButton user={user} /> */}
          {/* <LogoutButton /> */}
        {/* </li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
