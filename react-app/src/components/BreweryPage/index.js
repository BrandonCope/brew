import React from "react"
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import './BreweryPage.css'
import BreweryEditForm from "../BreweryEditForm"
import BreweryEditFormModal from "../BreweryEditForm"
import { deleteBrewery } from "../../store/brews"
import ReviewFormModal from "../ReviewForm"

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
                        <h2>{brew.name}</h2>
                        {brew?.host_id === user?.id ? <div>
                            <BreweryEditFormModal brew={brew} />
                            <button onClick={(e) => {
                                dispatch(deleteBrewery(brew.id))
                                history.push(`/profiles/${user?.id}`)
                                }}>Delete</button>
                        </div> : <><ReviewFormModal brew={brew} /></>}
                    </div>
                   <div className="brewery-detail-body-container">
                   <div>
                        <h3>Recommended Reviews</h3>
                        <div>
                            {filterReviewArr.map((review) => (
                                <div>
                                    <h3>{review.first_name} {review.last_name.slice(0,1)}.</h3>
                                    <p>{review.rating}</p>
                                    <p>{review.content}</p>
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
