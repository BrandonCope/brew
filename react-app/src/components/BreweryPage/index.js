import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import './BreweryPage.css'
import BreweryEditForm from "../BreweryEditForm"
import BreweryEditFormModal from "../BreweryEditForm"

const BreweryPage = () => {
    const {id} = useParams()
    const user = useSelector((state) => state.session.user)
    const brews = useSelector((state) => state.breweries)
    const brewArr = Object.values(brews)
    const filterBrewArr = brewArr.filter((brew) => brew?.id === +id)
    const images = useSelector((state) => state.images)
    const imageArr = Object.values(images)
    const filterImageArr = imageArr.filter((image => image?.brewery_id === +id ))
    console.log(filterBrewArr)


    return (
        <div className="brewery-page-div">
           {filterBrewArr?.map((brew) => (
               <div>
                   <div id="carousel">
                   {filterImageArr.map((image) => (
                           <div className="slide">
                           <img className="carousel-images" alt='beer and barstools' src={image?.url} />
                           </div>
                   ))}
                   </div>
                    <div className="brew-title">
                        <h2>{brew.name}</h2>
                        {brew?.host_id === user?.id ? <div>
                            <BreweryEditFormModal brew={brew} />
                            <button>Delete</button>
                        </div> : <></>}
                    </div>
                   <div className="brewery-detail-body-container">
                   <div>
                        <h3>Leave a Review</h3>
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
