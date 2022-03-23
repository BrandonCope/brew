import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
import ProfileNav from "../ProfileNav"
import ImageDetailModal from '../ImageDetailModal';

const ProfileMyImages = () => {
    const user = useSelector((state) => state.session.user)
    const images = useSelector((state) => state.images)
    const imageArr = Object.values(images)
    const filterImageArr = imageArr.filter((image => image?.user_id === +user?.id))


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
               <h2></h2>
               {filterImageArr ? <div className="image-matrix">
                   {filterImageArr.map((image) => (
                        <div>
                            <ImageDetailModal image={image} />
                            {/* <img className='image-all' src={image.image} /> */}
                        </div>
                    ))}
                    </div>
                : <div className="no-brewery-div">
                   <h1>Go share your images!</h1>
                   <NavLink className='profile-host-navlink' to='/'>Go to Breweries</NavLink>
                   </div>
                   }
           </div>
        </div>
        </>
    )
}

export default ProfileMyImages
