import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import ProfileNav from "../ProfileNav"
import ImageDetailProfileModal from '../ImageDetailProfileModal';


const ProfileMyImages = () => {




    const user = useSelector((state) => state.session.user)
    const images = useSelector((state) => state.images)
    const imageArr = Object.values(images)
    const filterImageArr = imageArr.filter((image => image?.user_id === +user?.id))



    return (
        <>
           <h1 className="profile-name-title">{user?.first_name} {user?.last_name.slice(0,1)}.</h1>
         <div className="profile-body-div">
                   <ProfileNav />
           <div className="profile-brew-snippet-list-container">
               <h2 className="my-profile-tab-title">My Images</h2>
               {filterImageArr.length ? <div className="image-matrix">
                   {filterImageArr.map((image) => (
                        <div key={image.id}>
                            <ImageDetailProfileModal image={image} />
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
