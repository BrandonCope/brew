import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getUsers } from './store/users';
import { getBreweries } from './store/breweries';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loginForm, setLoginForm] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(authenticate());
      getBreweries()
      getUsers()
      setLoaded(true);
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar loginForm={loginForm} setLoginForm={setLoginForm} />
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/profiles/:id' >
          <h1>Hello Profiles Page</h1>
          {/* <BusinessPage /> */}
        </Route>
        <Route path='/' exact={true} >
          <h1>Hello Home Page</h1>
          {/* <HomePage /> */}
        </Route>
        <Route>
          <h1>Page NOT FOUND</h1>
          {/* <NotFoundPage /> */}
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
      </Switch>
    </>
  );
}

export default App;
