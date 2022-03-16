import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router-dom';
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
  // const location = useLocation();
  // const history = useHistory();

  useEffect(() => {
    let errors = []
    if (username.length >= 40) {
        errors.push('Username: Max length of 40 characters reached.')
    }
    if (first_name.length >= 40) {
        errors.push('First Name: Max length of 40 characters reached.')
    }
    if (last_name.length >= 40) {
        errors.push('Last Name: Max length of 40 characters reached.')
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
    <div className='signup-form-container'>
      <h1 className="app-title">Sign up to Brew</h1>
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={first_name}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={last_name}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
   </div>
  );
};

export default SignUpForm;
