import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useImageModal } from '.';
import { createImage } from '../../store/images';


function ImageForm({ brew }) {
    const [url, setURL] = useState('')
    const [errors, setErrors] = useState([]);
    const {setShowModal} = useImageModal()
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        let errors = []
        setErrors(errors)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user) {

            const new_image = {
                url,
                user_id: user?.id,
                brewery_id: brew?.id,
            }
            const data = await dispatch(createImage(new_image));
            if (data.errors) {
                setErrors(data.errors);
            } else {
                setShowModal(false)
            }
        } else {
            history.push(`/login`)
        }
    }

    return (
        <div className='image-create-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div className='error-message' key={ind}>{error}</div>
                    ))}
                </div>
                <div className='review-form-container'>
                    <label>
                        Image URL:
                    </label>
                    <input
                        className='review-form-textarea'
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
                        rows="2"
                        column="15"
                        placeholder='Paste Image URL...'
                        maxLength="255"
                    >
                    </input>
                    <button className='image-post-button'>POST</button>

                </div>
                <div>

                </div>
            </form>
        </div>
    )

}

export default ImageForm
