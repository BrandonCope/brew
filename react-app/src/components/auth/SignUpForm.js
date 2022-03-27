import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect} from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {
    let errors = []
    if (username.length >= 20) {
        errors.push('Username: Max length of 20 characters reached.')
    }
    if (first_name.length >= 15) {
        errors.push('First Name: Max length of 15 characters reached.')
    }
    if (last_name.length >= 15) {
        errors.push('Last Name: Max length of 15 characters reached.')
    }
    if (email.length >= 255) {
        errors.push(['Email: Max length of 255 characters reached.'])
    }
    setErrors(errors)
}, [username, email, first_name, last_name])

  const onSignUp = async (e) => {
    e.preventDefault();

    const confirm_password = repeatPassword
    const data = await dispatch(signUp(username, email, first_name, last_name, password, confirm_password));
    if (data) {
      let errors = []
      errors.push(...data)
      setErrors(errors)
      if (password !== confirm_password) {
        setPassword("");
        setRepeatPassword("")
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }


  return (
    <>
    <div className='logo-home-container'>
      <NavLink className="Nav-logo-container" to="/" >
            <h2><i className="fa-brands fa-yelp"></i> Brew</h2>
          </NavLink>
    </div>
    <div className='login-body'>
      <div className='login-page'>
    <div className='signup-form-container'>
      <h1 className="app-title">Sign up for Brew</h1>
      <div className='error-container'>
        <div>
        {errors && errors.map((error, ind) => (
          <div className='error-div' key={ind}>{error}</div>
        ))}
        </div>
      </div>
    <form onSubmit={onSignUp}>
      <div>
        <input
          className='login-input'
          placeholder='User Name'
          type='text'
          maxLength={20}
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
        placeholder='Email'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
        placeholder='First Name'
          type='text'
          name='first_name'
          maxLength={15}
          onChange={updateFirstName}
          value={first_name}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
        placeholder='Last Name'
          type='text'
          name='last_name'
          maxLength={15}
          onChange={updateLastName}
          value={last_name}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
          placeholder='Password'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
          placeholder='Confirm Password'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <button className='login-form-button' type='submit'>Sign Up</button>
    </form>
        <div className='login-redirect-container'>
          <p>Have an account?</p>
          <NavLink className='switchFormButton' to="/login" >Login </NavLink>
        </div>

      </div>
        <img  className='login-image' alt="main page background" id="home-image" src="https://brew-aa.s3.amazonaws.com/b7a4237624984a8483810d5cbb96a555.png" />
    </div>

   </div>
    </>
  );
};

export default SignUpForm;
