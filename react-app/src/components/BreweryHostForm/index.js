import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createBrewery } from '../../store/brews';
import './BreweryHost.css'

const BreweryHostForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let errors = []
        if (name.length >= 40) {
            errors.push('Brewery Name: Max length of 40 characters reached.')
        }
        if (address.length >= 40) {
            errors.push('Address: Max length of 40 characters reached.')
        }
        if (city.length >= 40) {
            errors.push('City: Max length of 40 characters reached.')
        }
        if (state.length > 2) {
            errors.push('State: Max length of 2 characters reached.')
        }
        if (zip_code.length > 5) {
            errors.push('ZIP code: Max length of 5 characters reached.')
        }
        if (phone.length > 13) {
            errors.push('Phone: Max length of 13 characters reached.')
        }
        if (email.length >= 255) {
            errors.push(['Email: Max length of 255 characters reached.'])
        }
        setErrors(errors)
    }, [name, email, address, city, state, zip_code, phone])

    const reset = () => {
        setName("");
        setAddress("");
        setCity("");
        setState("");
        setZipCode("");
        setPhone("");
        setEmail("");
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (user) {

            const buildBrewery = {
                name,
                address,
                city,
                state,
                zip_code,
                phone,
                email,
                host_id: user?.id,
            }
            const data = await dispatch(createBrewery(buildBrewery))
            if (data.errors) {
                setErrors(data.errors);
            } else {
              history.push(`/profiles/${user?.id}`)
            }
          } else {
          history.push(`/`)
            reset()
        }


    }

      const updateName = (e) => {
        setName(e.target.value);
      };

      const updateAddress = (e) => {
          setAddress(e.target.value);
        };
        const updateCity = (e) => {
            setCity(e.target.value);
        };

        const updateState = (e) => {
            setState(e.target.value);
        };

        const updateZipCode = (e) => {
            setZipCode(e.target.value);
        };
        const updatePhone = (e) => {
          setPhone(e.target.value);
        };
        const updateEmail = (e) => {
          setEmail(e.target.value);
        };


    return (
        <div className='login-body'>
          <div className='login-page'>
            <div className='signup-form-container'>
      <h1 className="app-title">Host a Brewery</h1>
      <div>
        {errors.map((error, ind) => (
          <div className='error-div' key={ind}>{error}</div>
        ))}
      </div>
    <form onSubmit={handleSubmit}>
      <div>
        <input
        className='login-input'
          placeholder='Brewery Name'
          type='text'
          name='name'
          onChange={updateName}
          value={name}
          maxLength={40}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
        placeholder='Address'
          type='text'
          name='address'
          onChange={updateAddress}
          value={address}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
        placeholder='City'
          type='text'
          name='city'
          onChange={updateCity}
          maxLength={20}
          value={city}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
          placeholder='State Abbreviation: XX'
          type='state'
          name='state'
          maxLength={2}
          onChange={updateState}
          value={state}
        ></input>
      </div>
      <div>

        <input
        className='login-input'
          placeholder='ZIP code: XXXXX'
          type='state'
          name='repeat_state'
          onChange={updateZipCode}
          value={zip_code}
          maxLength={5}
        ></input>
      </div>
      <div>
        <input
        className='login-input'
        placeholder='Phone: (XXX)XXX-XXXX'
          type='text'
          name='phone'
          onChange={updatePhone}
          value={phone}
          maxLength={13}
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
      <button className='login-form-button' type='submit'>Submit</button>
    </form>

            </div>
          </div>
        </div>
    )
}

export default BreweryHostForm
