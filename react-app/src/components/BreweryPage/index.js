import React, { useEffect } from "react"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import './BreweryPage.css'
import BreweryEditFormModal from "../BreweryEditForm"
import { getBrews } from "../../store/brews"
import ReviewFormModal from "../ReviewForm"
import ImageFormModal from "../ImageForm"
import { FaStar } from 'react-icons/fa'
import PageNotFound from "../NotFound"
import ReviewList from "../ReviewList"
import DeleteFormModal from "../DeleteForm"

const BreweryPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBrews())

    }, [dispatch])

    const user = useSelector((state) => state.session.user)
    const brews = useSelector((state) => state.breweries)
    const brewArr = Object.values(brews)
    const filterBrewArr = brewArr.filter((brew) => brew?.id === +id)
    const images = useSelector((state) => state.images)
    const imageArr = Object.values(images)
    const filterImageArr = imageArr.filter((image => image?.brewery_id === +id))
    const reviews = useSelector((state) => state.reviews)
    const reviewArr = Object.values(reviews).reverse()
    const filterReviewArr = reviewArr.filter((review) => review?.brewery_id === +id)
    const rateArr = filterReviewArr.map((review) => review?.rating)
    const avgRate = (arr) => {
        let num = 0
        arr.forEach(element => {
            num += element
        });
        if (num) {
            return Math.round(num/arr.length)
        } else {
            return 0
        }
    }
    // brewAvg must stay after avgRate
    const brewAvg = avgRate(rateArr)




    return (
        <div className="brewery-page-div">
           {filterBrewArr.length ? filterBrewArr?.map((brew) => (
               <div key={brew.id}>
                   <div id="carousel">
                         {filterImageArr.map((image) => (
                           <div key={image.id} className="slide">
                           <img className="carousel-images" alt='beer and barstools' src={image?.image} />
                           </div>
                         ))}
                         <div className="brew-page-title">
                             <div className="carousel-content">
                                <div>
                                <h1>{brew.name}</h1>
                                    <div className="star-view-div">
                                        {[...Array(5)].map((star, i) => {
                                            const rateVal = i + 1;
                                            return (
                                                <div key={rateVal} >
                                                    <FaStar
                                                    className="star-view"
                                                    color={rateVal <= brewAvg ? "ffc107" : "e4e5e9"}
                                                    size={40}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            <div>
                                <NavLink className='all-photo' to={`/brews/${brew.id}/images`} >See All Photos</NavLink>
                            </div>
                             </div>
                         </div>
                   </div>
                    <div className="brew-body">
                        <div className="review-photo-div">
                        {brew?.host_id === user?.id ? <div>
                            <BreweryEditFormModal brew={brew} />
                            <DeleteFormModal brew={brew} />
                            <NavLink to={`/profiles/brews`}><button className='profile-brew-page-button'>My Profile</button></NavLink>
                            </div> : <><ReviewFormModal brew={brew} /></>}
                        <ImageFormModal brew={brew} />
                        </div>
                    </div>
                   <div className="brewery-detail-body-container">
                   <div className="brew-review-container">
                        <h3>Recommended Reviews</h3>
                        <ReviewList brew={brew} />
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
           ))  : <PageNotFound />}
        </div>
    )
}

export default BreweryPage
