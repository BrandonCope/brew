import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const ProfilePage = () => {
    const user = useSelector((state) => state.session.user)
    const brews = useSelector((state) => state.breweries)
    const brewArr = Object.values(brews)
    const filterBrewArr = brewArr.filter((brew) => brew?.host_id === +user?.id)

    


    return (
        <div className="body-div">
           <h1>Hello from Profile Component</h1>
           <div>
               {filterBrewArr?.map((brew) => (
                   <div key={brew.id}>
                       <NavLink to={`/brews/${brew.id}`} >{brew.name}</NavLink>

                   </div>
               ))}
           </div>
        </div>
    )
}

export default ProfilePage
