import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useReviewModal } from '.'
import { createReview } from '../../store/reviews'


function ReviewForm({ brew }) {
    const [content, setContent] = useState("")
    const [rating, setRating] = useState("")
    const [errors, setErrors] = useState([]);
    const {setShowModal} = useReviewModal();
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    console.log(rating)

    useEffect(() => {
        let errors = []
        if (content.length >= 255) {
            setErrors(['Max length of 255 characters reached.'])
        } else {
            setErrors(errors)
        }
    }, [content])

    const reset = () => {
        setContent("");
        setRating("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user) {

            const new_review = {
                content,
                rating,
                user_id: user?.id,
                brewery_id: brew?.id,
            }
            const data = await dispatch(createReview(new_review));
            if (data.errors) {
                setErrors(data.errors);
            } else {
                setShowModal(false)
            }
        } else {
            history.push(`/login`)
            reset()
        }
    }

    return (
        <div className='review-create-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div className='error-message' key={ind}>{error}</div>
                    ))}
                </div>
                <div className='review-form-container'>
                    <label>
                    Rating:
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    </label>
                    <textarea
                        className='review-form-textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="2"
                        column="15"
                        placeholder='Add a review...'
                        maxLength="255"
                    >
                    </textarea>
                    <button className='review-post-button'>POST</button>

                </div>
                <div>

                </div>
            </form>
        </div>
    )

}

export default ReviewForm
