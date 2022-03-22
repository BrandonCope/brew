import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { editBrewery } from '../../store/brews';
import { useEditModal } from '.';
import './BrewEditForm.css'

const BreweryEditForm = ({brew}) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(`${brew.name}`);
    const [address, setAddress] = useState(`${brew.address}`);
    const [city, setCity] = useState(`${brew.city}`);
    const [state, setState] = useState(`${brew.state}`);
    const [zip_code, setZipCode] = useState(`${brew.zip_code}`);
    const [phone, setPhone] = useState(`${brew.phone}`);
    const [email, setEmail] = useState(`${brew.email}`);
    const {setShowModal} = useEditModal();
    const user = useSelector(state => state.session.user);
    const id = user?.id
    const brewId = brew?.id
    const dispatch = useDispatch();
    const history = useHistory();

    const states = [
      "State", "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC",
      "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA",
      "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE",
      "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]

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
        // if (state.length > 2) {
        //     errors.push('State: Max length of 2 characters reached.')
        // }
        if (zip_code.length > 5) {
            errors.push('ZIP code: Max length of 5 characters reached.')
        }
        if (phone.length > 14) {
            errors.push('Phone: Max length of 13 characters reached.')
        }
        if (email.length >= 255) {
            errors.push(['Email: Max length of 255 characters reached.'])
        }
        setErrors(errors)
    }, [name, email, address, city, zip_code, phone])


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
            const data = await dispatch(editBrewery(buildBrewery, brewId))
            if (data.errors) {
              setErrors(data.errors);
            } else {
              setShowModal(false)
            }
          } else {
            history.push(`/login`)
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
        const handlePhoneNumber = (e) => {
          const formattedNumber = formatNumber(e.target.value);
          setPhone(formattedNumber)
        }
        const updatePhone = (e) => {
          handlePhoneNumber(e);
        };
        const formatNumber = (value) => {
          if (!value) return value;
          const number = value.replace(/[^\d]/g,"")
          const numberLength = number.length
          if (numberLength < 4) return number;
          if (numberLength < 7) {
            return `(${number.slice(0,3)}) ${number.slice(3)}`;
          }
          return `(${number.slice(0,3)}) ${number.slice(3,6)}-${number.slice(6,10)}`
        }
        const updateEmail = (e) => {
          setEmail(e.target.value);
        };


    return (
      <div className='edit-host-body'>
          <div className='edit-host-page'>
            <div className='edit-host-form-container'>
      <h1 className="app-title">Host a Brewery</h1>
      <div>
        {errors.map((error, ind) => (
          <div className='error-div' key={ind}>{error}</div>
        ))}
      </div>
    <form onSubmit={handleSubmit}>
      <div>
        <input
        className='host-input'
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
        className='host-input'
        placeholder='Address'
          type='text'
          name='address'
          onChange={updateAddress}
          value={address}
        ></input>
      </div>
      <div>

        <input
        className='host-input'
        placeholder='City'
          type='text'
          name='city'
          onChange={updateCity}
          maxLength={20}
          value={city}
        ></input>
      </div>
      <div>
      <div className='zip-state'>
        <select value={state}  className='host-select' onChange={updateState}>
          {states.map((state) => (
            <option value={state}>{state}</option>
          ))}
        </select>
      <div>
        <input
        className='host-zip-input'
          placeholder='ZIP code: XXXXX'
          type='state'
          name='repeat_state'
          onChange={updateZipCode}
          value={zip_code}
          maxLength={5}
        ></input>
      </div>
      </div>
      </div>
      <div>
        <input
        className='host-input'
        placeholder='Phone: (XXX)XXX-XXXX'
          type='text'
          name='phone'
          onChange={updatePhone}
          value={phone}
          maxLength={14}
        ></input>
      </div>
      <div>
        <input
        className='host-input'
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

export default BreweryEditForm
