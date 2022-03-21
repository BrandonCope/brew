import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useReviewModal } from '.'
import { createReview, editReview } from '../../store/reviews'
import { FaStar } from 'react-icons/fa'
import './ReviewForm.css'


function ReviewForm({ brew }) {
    const [content, setContent] = useState("")
    const [rating, setRating] = useState("")
    const [hover, setHover] = useState(null)
    const [errors, setErrors] = useState([]);
    const {setShowModal} = useReviewModal();
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)

    // console.log(rating)

    useEffect(() => {
        let errors = []
        if (content.length >= 2000) {
            setErrors(['Max length of 2000 characters reached.'])
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
                   <h3>{brew.name}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors && errors.map((error, ind) => (
                        <div className='error-div' key={ind}>{error}</div>
                        ))}
                </div>
                <div className='review-form-container'>
                    <div className='review-box-border'>
                    <div className='review-stars'>
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
                            <p>
                            Select your rating
                            </p>
                    </div>
                    <textarea
                        className='review-form-textarea'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="20"
                        cols="65"
                        placeholder='Doesn’t look like much when you walk past, but I was practically dying of hunger so I popped in. The definition of a hole-in-the-wall. I got the regular hamburger and wow…  there are no words. A classic burger done right. Crisp bun, juicy patty, stuffed with all the essentials (ketchup, shredded lettuce, tomato, and pickles). There’s about a million options available between the menu board and wall full of specials, so it can get a little overwhelming, but you really can’t go wrong. Not much else to say besides go see for yourself! You won’t be disappointed.
                        '
                        maxLength="2000"
                    >
                    </textarea>

                    </div>
                    <button className='review-post-button'>Post Review</button>
                </div>
                <div>

                </div>
            </form>
        </div>
    )

}

export default ReviewForm
