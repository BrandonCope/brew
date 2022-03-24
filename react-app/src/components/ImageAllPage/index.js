import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getBrews } from '../../store/brews';
import ImageDetailModal from '../ImageDetailModal';
import ImageFormModal from '../ImageForm';
import './ImageAll.css'

const ImageAll = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const brews = useSelector((state) => state.breweries)
    const brewsArr = Object.values(brews)
    const filterBrewArr = brewsArr.filter((brew => brew?.id === +id))
    const images = useSelector((state) => state.images)
    const imageArr = Object.values(images)
    const filterImageArr = imageArr.filter((image => image?.brewery_id === +id))

    useEffect(() => {
        dispatch(getBrews())
    }, [dispatch])




    return (
        <div className='image-all-page'>
        <NavLink className='return-link' to={`/brews/${id}`}>Return</NavLink>
            <div>
            {filterBrewArr.map((brew) => (

                <div key={brew.id} className='image-all-top'>
                    <h2>Photos for {brew.name}</h2>
                    <div>
                        <ImageFormModal brew={brew} />
                    </div>
                </div>
                    ))}
                <div className='image-matrix'>
                    {filterImageArr.map((image) => (
                        <div key={image.id}>
                            <ImageDetailModal image={image} />
                            {/* <img className='image-all' src={image.image} /> */}
                        </div>
                    ))}
                </div>
                    </div>
        </div>
    );
}

export default ImageAll;
