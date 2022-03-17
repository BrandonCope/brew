import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
// import { getUsers } from './store/users.js';
import { getBrews } from './store/brews.js';
import { getImages } from './store/images.js'
import { getReviews } from './store/reviews.js'
import HomePage from './components/HomePage';
import ProfilePage from './components/Profile';
import PageNotFound from './components/NotFound';
import BreweryPage from './components/BreweryPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loginForm, setLoginForm] = useState(true)
  const [notLandingPage, setNotLandingPage] = useState(true)
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    if (!user && (location.pathname === "/login" || location.pathname === "/sign-up")) setNotLandingPage(false)
    else setNotLandingPage(true)
  }, [user, location])

  useEffect(() => {
      dispatch(authenticate());
      dispatch(getBrews())
      dispatch(getImages())
      dispatch(getReviews())
      // dispatch(getUsers())
      setLoaded(true);
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (loaded &&
    <>
      {notLandingPage && (<NavBar loginForm={loginForm} setLoginForm={setLoginForm} />)}
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/brews/:id'>
          <BreweryPage />
        </Route>
        <Route path='/profiles/:id' >
          <h1>Hello Profiles Page</h1>
          <ProfilePage />
        </Route>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <Route>
          <h1>Page NOT FOUND</h1>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
