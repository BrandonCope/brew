import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'
import './Search.css'
import { getBrews } from '../../store/brews';

const Search = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBrews())
    }, [dispatch])

    const brews = useSelector((state) => state.breweries)
    const brewsArr = Object.values(brews)

    const searchArr = brewsArr?.filter(({name, images, rating, city, state, id}) => {
        return name?.toLowerCase().includes(location.state?.detail.toLowerCase())
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
            {searchArr.length ? searchArr?.map(({name, images, rating, city, state, id}) => (
                    <div key={id} className='brew-snippet-box'>
                <Link className='brew-snippet-link' to={`brews/${id}`} key={id} >
                                  <div className="search-brew-snippet-image-background">
                               {/* <p className="default-background">Brew</p> */}
                               {images[0]?.url ? <img alt="snippet-pic" className="brew-snippet-box-img" src={images[0]?.url}/> : <img alt="snippet-pic" className="brew-snippet-box-img" src="https://brew-aa.s3.amazonaws.com/4a76aee20e574a118a5404dda9abad8f.png" />}
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
                                                <div key={rateVal} >
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
            )) : <h2>No Results Found</h2>}
        </div>
    )
}

export default Search
