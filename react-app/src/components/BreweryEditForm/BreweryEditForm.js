import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createBrewery, editBrewery } from '../../store/brews';
// import './BreweryHost.css'

const BreweryEditForm = ({brew}) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(`${brew.name}`);
    const [address, setAddress] = useState(`${brew.address}`);
    const [city, setCity] = useState(`${brew.city}`);
    const [state, setState] = useState(`${brew.state}`);
    const [zip_code, setZipCode] = useState(`${brew.zip_code}`);
    const [phone, setPhone] = useState(`${brew.phone}`);
    const [email, setEmail] = useState(`${brew.email}`);
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
            }
            const data = await dispatch(editBrewery(buildBrewery))
            if (data.errors) {
                setErrors(data.errors);
            } 
        } else {
            history.push(`/profiles/${user?.id}`)
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
        <div className="host-form-body-div">
      <h1 className="app-title">Host a Brewery</h1>
    <form onSubmit={handleSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div className='error-div' key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
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
        placeholder='Address'
          type='text'
          name='address'
          onChange={updateAddress}
          value={address}
        ></input>
      </div>
      <div>

        <input
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
        placeholder='Email'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <button type='submit'>Submit</button>
    </form>
        </div>
    )
}

export default BreweryEditForm
