import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const demo = {
      email: "demo@aa.io",
      password: "password",
    }
    const data = await dispatch(login(demo.email, demo.password));
    if (data) {
      setErrors(data);
    }

  }

  return (
    <>
    <div className='logo-home-container'>
      <NavLink className="Nav-logo-container" to="/" activeClassName='active'>
            <h2>Brew</h2>
          </NavLink>
    </div>
    <div className='login-form-container'>
      <h1>Log in to Brew</h1>
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <button type='submit'>Login</button>
        <button className='login-form-submit' type='button' onClick={handleClick}>Demo</button>
      </div>
    </form>
    <div className='login-redirect-container'>
          <p>Don't have an account?</p>
          <NavLink className='switchFormButton' to="/sign-up" >Sign Up </NavLink>
        </div>
    </div>
    </>
  );
};

export default LoginForm;
