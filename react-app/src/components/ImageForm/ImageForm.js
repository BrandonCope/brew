import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useImageModal } from '.';
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
        console.log(e.target.files)
        console.log(file)
        setURL(file);
    }
    console.log(url)

    useEffect(() => {
        let errors = []
        setErrors(errors)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user) {
        const formData = new FormData()
        formData.append("image", url)
        console.log(formData.image)
        formData.append("user_id", user?.id)
        formData.append("brewery_id", brew?.id)

        //     const formData = {
        //         url,
        //         user_id: user?.id,
        //         brewery_id: brew?.id,
        //     }
        //     }
        console.log(formData)

        const data = await dispatch(createImage(formData));
        console.log(data)
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
            <h2>{brew.name}: Add Photos</h2>
            <form className='image-form' onSubmit={handleSubmit}>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div className='error-div' key={ind}>{error}</div>
                    ))}
                        {/* <img src={url?.name}></img> */}
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
                    {/* <input
                        className='review-form-textarea'
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
                        rows="2"
                        column="15"
                        placeholder='Paste Image URL...'
                        maxLength="255"
                    >
                    </input> */}
                    <button className='review-post-button'>POST</button>
            </form>
        </div>
    )

}

export default ImageForm
