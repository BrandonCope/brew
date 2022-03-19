import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'
import './Search.css'

const Search = () => {
    const location = useLocation()

    const brews = useSelector((state) => state.breweries)
    const brewsArr = Object.values(brews)

    const searchArr = brewsArr.filter(({name, images, rating, city, state, id}) => {
        return name.toLowerCase().includes(location.state.detail.toLowerCase())
    })

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

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <div className='search-result-div'>
            {searchArr?.map(({name, images, rating, city, state, id}) => (
                    <div className='brew-snippet-box'>
                <Link className='brew-snippet-link' to={`brews/${id}`} key={id} >
                                  <div className="search-brew-snippet-image-background">
                               {/* <p className="default-background">Brew</p> */}
                               <img className="brew-snippet-box-img" src={images[0]?.url} onError="../../../images/Biggest-Craft-Beer-Releases-of-2017_fb.jpg" />
                           </div>
                       <div className="brew-snippet-lower">
                           <div>
                        {name}
                           </div>
                           <div className="review-rate-div">
                           <div className="star-view-div">
                                        {[...Array(5)].map((star, i) => {
                                            const rateVal = i + 1;
                                            return (
                                                <div >
                                                    <FaStar
                                                    className="star-view"
                                                    color={rateVal <= avgRate(rating) ? "ffc107" : "e4e5e9"}
                                                    size={20}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                        {numOfRevs(rating)} Reviews

                           </div>
                                    <div>
                                        {city}, {state}
                                    </div>
                       </div>
                </Link>


                    </div>
            ))}
        </div>
    )
}

export default Search
