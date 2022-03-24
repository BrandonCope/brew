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
      <NavLink className="Nav-logo-container" to="/">
            <h2><i className="fa-brands fa-yelp"></i> Brew</h2>
          </NavLink>
    </div>
    <div className='login-body'>
    <div className='login-page'>
      <div className='login-form-container'>
        <h1>Log in to Brew</h1>
                <div>
                  {errors.map((error, ind) => (
                    <div className='error-div' key={ind}>{error}</div>
                  ))}
                </div>
            <form onSubmit={onLogin}>
                <div>
                  <input
                  className='login-input'
                    name='email'
                    type='text'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <div>
                  <input
                  className='login-input'
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
                  <div>
                  <button className='login-form-button' type='submit'>Login</button>
                  </div>
                  <div>
                  <button className='login-form-button' type='button' onClick={handleClick}>Demo</button>
                  </div>
            </form>
            <div className='login-redirect-container'>
              <p>Don't have an account?</p>
              <NavLink className='switchFormButton' to="/sign-up" >Sign Up </NavLink>
            </div>
        </div>

           <img  className='login-image' alt="main page background" id="home-image" src="https://brew-aa.s3.amazonaws.com/b7a4237624984a8483810d5cbb96a555.png" />

      </div>

    </div>
    </>
  );
};

export default LoginForm;
