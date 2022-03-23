import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
import ProfileNav from "../ProfileNav"

const ProfileMyBrews = () => {
    const user = useSelector((state) => state.session.user)
    const brews = useSelector((state) => state.breweries)
    const brewArr = Object.values(brews)
    const filterBrewArr = brewArr.filter((brew) => brew?.host_id === +user?.id)


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

    const numOfRevs = (arr) => {
        let num = 0
        arr.forEach(rev => num += 1)
        return num
    }

    return (
        <>
           <h1 className="profile-name-title">{user?.first_name} {user?.last_name.slice(0,1)}.</h1>
         <div className="profile-body-div">
                   <ProfileNav />
           <div className="brew-snippet-list-container">
               {filterBrewArr.length > 0 ? filterBrewArr?.map((brew) => (
                   <div className="brew-snippet-box" key={brew.id}>
                       <NavLink className='brew-snippet-link' to={`/brews/${brew.id}`} >
                           <div className="brew-snippet-image-background">
                               {/* <p className="default-background">Brew</p> */}
                               <img className="brew-snippet-box-img" src={brew.images[0]?.url}/>
                           </div>
                       <div className="brew-snippet-lower">
                           <div>
                        {brew.name}
                           </div>
                           <div className="review-rate-div">
                           <div className="star-view-div">
                                        {[...Array(5)].map((star, i) => {
                                            const rateVal = i + 1;
                                            return (
                                                <div >
                                                    <FaStar
                                                    className="star-view"
                                                    color={rateVal <= avgRate(brew.rating) ? "ffc107" : "e4e5e9"}
                                                    size={20}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                        {numOfRevs(brew.rating)} Reviews

                           </div>
                                    <div>
                                        {brew.city}, {brew.state}
                                    </div>
                       </div>
                       </NavLink>
                   </div>
               )) : <div className="no-brewery-div">
                   <h1>Have a brewery to promote?</h1>
                   <NavLink className='profile-host-navlink' to='/brews/new'>Host a Brewery</NavLink>
                   </div>
                   }
           </div>
        </div>
        </>
    )
}

export default ProfileMyBrews
