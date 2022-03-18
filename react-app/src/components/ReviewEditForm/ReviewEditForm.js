import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useReviewEditModal } from '.'
import { editReview } from '../../store/reviews'
import { FaStar } from 'react-icons/fa'


function ReviewEditForm({ brew, review }) {
    const [content, setContent] = useState(review.content)
    const [rating, setRating] = useState(review.rating)
    const [hover, setHover] = useState(null)
    const [errors, setErrors] = useState([]);
    const {setShowModal} = useReviewEditModal();
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const reviewId = review.id
    console.log(review.id)

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
            const data = await dispatch(editReview(new_review, reviewId));
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
                <div>
                        {[...Array(5)].map((star, i) => {
                            const rateVal = i + 1;
                            return (
                                <label>

                                    <input
                                    type="radio"
                                    value={rateVal}
                                    onClick={() => setRating(rateVal)}
                                    />
                                    <FaStar
                                    className="star"
                                    color={rateVal <= (hover || rating) ? "ffc107" : "e4e5e9"}
                                    size={30}
                                    onMouseEnter={() => setHover(rateVal)}
                                    onMouseLeave ={() => setHover(null)}
                                    required
                                    />
                                </label>
                                )
                        })}
                    </div>
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

export default ReviewEditForm
