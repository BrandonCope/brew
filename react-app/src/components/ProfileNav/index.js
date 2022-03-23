import React from "react"
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import { FaStar } from 'react-icons/fa'
import './ProfileNav.css'

const ProfileNav = () => {
    const user = useSelector(state => state.session.user);

    return (
            <div>
                <nav className="profile-nav">
                    <div className="profile-links-name-div">{user?.first_name}'s Profile</div>
                    <NavLink className='profile-reviews-link' to={'/profiles/reviews'}><FaStar /> My Reviews</NavLink>
                    <NavLink className='profile-nav-link' to={'/profiles/images'}><i class="fa-solid fa-camera"></i> My Images</NavLink>
                    <NavLink className='profile-nav-link' to={'/profiles/brews'}><i class="fa-solid fa-beer-mug-empty"></i> My Brews</NavLink>
                </nav>
            </div>
     )
}


export default ProfileNav
