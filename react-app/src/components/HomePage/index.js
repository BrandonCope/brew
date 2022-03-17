import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import './HomePage.css'
const HomePage = () => {

    const user = useSelector((state) => state.session.user)
    const brews = useSelector((state) => state.breweries)
    const brewArr = Object.values(brews)
    const filterBrewArr = brewArr.filter((brew) => brew?.host_id !== +user?.id)
    
    console.log('filterBrewArr', filterBrewArr)


    return (
        <>
        <div className="home-image-container">
           <img alt="main page background" id="home-image" src="../../../images/Biggest-Craft-Beer-Releases-of-2017_fb.jpg" />
        </div>

        <div className="body-div">
           <h1>Your Next Review Awaits</h1>
           <div>
               {filterBrewArr?.map((brew) => (
                   <div key={brew.id}>
                       <NavLink to={`/brews/${brew.id}`} >{brew.name}</NavLink>

                   </div>
               ))}
           </div>
        </div>
        </>
    )
}

export default HomePage
