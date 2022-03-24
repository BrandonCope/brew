import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import { authenticate } from './store/session';
import { getBrews } from './store/brews.js';
import { getImages } from './store/images.js'
import { getReviews } from './store/reviews.js'
import HomePage from './components/HomePage';
import PageNotFound from './components/NotFound';
import BreweryPage from './components/BreweryPage';
import BreweryHostForm from './components/BreweryHostForm';
import Footer from './components/Footer';
import ImageAll from './components/ImageAllPage';
import Search from './components/SearchBar/Search';
import ProfileMyBrews from './components/ProfileMyBrews';
import ProfileMyReviews from './components/ProfileMyReviews';
import ProfileMyImages from './components/ProfileMyImages';


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
      setLoaded(true);
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (loaded &&
    <>
      {notLandingPage && (<NavBar loginForm={loginForm} setLoginForm={setLoginForm} />)}
      {notLandingPage && (<Footer />)}
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/sign-up' >
          <SignUpForm />
        </Route>
        <Route path='/brews/new'>
          <BreweryHostForm />
        </Route>
        <Route path='/brews/:id/images'>
          <ImageAll />
        </Route>
        <Route path='/brews/:id'>
          <BreweryPage />
        </Route>
        <Route path='/profiles/brews' >
          <ProfileMyBrews />
        </Route>
        <Route path='/profiles/reviews' >
          <ProfileMyReviews />
        </Route>
        <Route path='/profiles/images' >
          <ProfileMyImages />
        </Route>
        <Route exact path='/' >
          <HomePage />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
