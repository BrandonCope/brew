import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
import './Profile.css'
import ProfileNav from "../ProfileNav"
import ProfileMyReviews from "../ProfileMyReviews"

const ProfilePage = () => {
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
         <div className="profile-body-div">
           {/* <h1 className="home-sub-title">{user?.first_name} {user?.last_name.slice(0,1)}.</h1> */}
                   {/* <ProfileNav /> */}
                   <ProfileMyReviews />
        </div>
        </>
    )
}

export default ProfilePage
