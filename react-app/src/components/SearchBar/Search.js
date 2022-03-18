import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import './Search.css'

const Search = () => {
    const location = useLocation()

    const brews = useSelector((state) => state.breweries)
    const brewsArr = Object.values(brews)

    const searchArr = brewsArr.filter(({name, id}) => {
        return name.toLowerCase().includes(location.state.detail.toLowerCase())
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <div className='search-result-div'>
            {searchArr?.map(({name, id}) => (
                <Link to={`brews/${id}`} key={id} >
                    <p>{name}</p>
                </Link>
            ))}
        </div>
    )
}

export default Search
