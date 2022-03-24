import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
import ProfileNav from "../ProfileNav"
import ReviewEditFormModal from "../ReviewEditForm"
import { deleteReview } from "../../store/reviews"

const ProfileMyReviews = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => state.reviews)
    const reviewArr = Object.values(reviews).reverse()
    const filterReviewArr = reviewArr.filter((review) => review?.user_id === +user?.id)


    return (
        <>
           <h1 className="profile-name-title">{user?.first_name} {user?.last_name.slice(0,1)}.</h1>
         <div className="profile-body-div">
                   <ProfileNav />
           <div className="my-review-snippet-container">
               <h2>My Reviews</h2>
               {filterReviewArr.length ? <div>
                {filterReviewArr.map((review) => (
                                <div key={review.id} className="review-box">
                                    <div className="brew-review-container-top">
                                    <h3>{review.brew_name}</h3>
                                    <p>{review.created_at.slice(0,17)}</p>
                                    {review.user_id === user?.id ? <div className="review-edit-delete">
                                        <ReviewEditFormModal review={review} />
                                        <button
                                        className="reviewFormButton"
                                        onClick={(e) => {
                                            dispatch(deleteReview(review.id))
                                        }}>Delete</button>
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
                : <div className="no-brewery-div">
                   <h1>Go write a review!</h1>
                   <NavLink className='profile-host-navlink' to='/'>Go to Breweries</NavLink>
                   </div>
                   }
           </div>
        </div>
        </>
    )
}

export default ProfileMyReviews
