import React from "react"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import './BreweryPage.css'
import BreweryEditForm from "../BreweryEditForm"
import BreweryEditFormModal from "../BreweryEditForm"
import { deleteBrewery } from "../../store/brews"
import ReviewFormModal from "../ReviewForm"
import { deleteReview } from "../../store/reviews"
import ReviewEditFormModal from "../ReviewEditForm"
import ImageFormModal from "../ImageForm"
import { FaStar } from 'react-icons/fa'

const BreweryPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const brews = useSelector((state) => state.breweries)
    const brewArr = Object.values(brews)
    const filterBrewArr = brewArr.filter((brew) => brew?.id === +id)
    const images = useSelector((state) => state.images)
    const imageArr = Object.values(images)
    const filterImageArr = imageArr.filter((image => image?.brewery_id === +id))
    const reviews = useSelector((state) => state.reviews)
    const reviewArr = Object.values(reviews)
    const filterReviewArr = reviewArr.filter((review) => review?.brewery_id === +id)
    console.log(filterReviewArr)


    return (
        <div className="brewery-page-div">
           {filterBrewArr?.map((brew) => (
               <div key={brew.id}>
                   <div id="carousel">
                   {filterImageArr.map((image) => (
                           <div key={image.id} className="slide">
                           <img className="carousel-images" alt='beer and barstools' src={image?.url} />
                           </div>
                   ))}
                   </div>
                    <div className="brew-title">
                        <div>
                        <h2>{brew.name}</h2>
                        </div>
                        <div>
                        {brew?.host_id === user?.id ? <div>
                            <BreweryEditFormModal brew={brew} />
                            <button onClick={(e) => {
                                dispatch(deleteBrewery(brew.id))
                                history.push(`/profiles/${user?.id}`)
                                }}>Delete</button>
                        </div> : <><ReviewFormModal brew={brew} /></>}
                        <ImageFormModal brew={brew} />
                        </div>
                        <div>
                            <NavLink to={`/brews/${brew.id}/images`} >See All Photos</NavLink>
                        </div>
                    </div>
                   <div className="brewery-detail-body-container">
                   <div className="brew-review-container">
                        <h3>Recommended Reviews</h3>
                        <div>
                            {filterReviewArr.map((review) => (
                                <div>
                                    <div className="brew-review-container-top">
                                    <h3>{review.first_name} {review.last_name.slice(0,1)}.</h3>
                                    {review.user_id === user?.id ? <div>
                                        <ReviewEditFormModal brew={brew} review={review} />
                                        <button onClick={(e) => {
                                            dispatch(deleteReview(review.id))
                                        }}>Delete</button>
                                    </div> : <></>}
                                    </div>
                                    <div className="star-view-div">
                                        {[...Array(5)].map((star, i) => {
                                            const rateVal = i + 1;
                                            return (
                                                <div >
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
                   </div>
                   <div className="contact-info-div">
                       <div>
                        <h3>Location:</h3>
                        <ul>
                            <li>
                                {brew.address}
                            </li>
                            <li>
                                {brew.city}, {brew.state} {brew.zip_code}
                            </li>
                        </ul>
                       </div>
                       <div>
                       <h3>Contact Info:</h3>
                       <ul>
                           <li>Phone: {brew.phone}</li>
                           <li>Email: {brew.email}</li>
                       </ul>

                       </div>
                   </div>
                   </div>
               </div>
           ))}
        </div>
    )
}

export default BreweryPage
