import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ReviewEditFormModal from "../ReviewEditForm"
import { FaStar } from 'react-icons/fa'
import DeleteFormModal from "../DeleteForm"


const ReviewList = ({brew}) => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => state.reviews)
    const reviewArr = Object.values(reviews).reverse()
    const filterReviewArr = reviewArr.filter((review) => review?.brewery_id === +id)

    return (
        <div>
                            {filterReviewArr.map((review) => (
                                <div key={review.id} className="review-box">
                                    <div className="brew-review-container-top">
                                    <h3>{review.first_name} {review.last_name.slice(0,1)}.</h3>
                                    {review.user_id === user?.id ? <div className="review-edit-delete">
                                        <ReviewEditFormModal brew={brew} review={review} />
                                        <DeleteFormModal review={review} />
                                    </div> : <></>}
                                    </div>
                                    <div className="star-view-div">
                                        {[...Array(5)].map((star, i) => {
                                            const rateVal = i + 1;
                                            return (
                                                <div key={rateVal} >
                                                    <FaStar
                                                    className="star-view"
                                                    color={rateVal <= review.rating ? "ffc107" : "e4e5e9"}
                                                    size={30}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <p className="review-content">{review.content}</p>
                                </div>
                            ))}
                        </div>
    )
}

export default ReviewList
