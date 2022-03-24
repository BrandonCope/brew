import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useImageModal } from '.';
import { getBrews } from '../../store/brews';

import { createImage } from '../../store/images';
import './ImageForm.css'


function ImageForm({ brew }) {
    const [url, setURL] = useState('')
    const [errors, setErrors] = useState([]);
    const {setShowModal} = useImageModal()
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    const updateImage = (e) => {
        const file = e.target.files[0];

        setURL(file);
    }


    useEffect(() => {
        let errors = []
        setErrors(errors)
    }, [])

    const cancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user) {
        const formData = new FormData()
        formData.append("image", url)

        formData.append("user_id", user?.id)
        formData.append("brewery_id", brew?.id)

        const data = await dispatch(createImage(formData));

            if (data.errors) {
                setErrors(data.errors);
            } else {
                dispatch(getBrews())
                setShowModal(false)
            }
        } else {
            history.push(`/login`)
        }
    }

    return (
        <div className='image-create-container'>
            <h2>{brew.name}: Add Photos</h2>
            <form className='image-form' onSubmit={handleSubmit}>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div className='error-div' key={ind}>{error}</div>
                    ))}
                </div>
                    <label>
                    </label>
                    <input
                    id="file-upload"
                    type='file'
                    accept="image/*"
                    name="image"
                    onChange={updateImage}
                    />
                <button className='review-post-button'>POST</button>
            </form>
            <div className='close-modal-button'><button onClick={cancelClick} className='add-photo-button'><i className="fa-solid fa-xmark"></i></button></div>
        </div>
    )

}

export default ImageForm
