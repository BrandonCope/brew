import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageFormModal from '../ImageForm';
import './ImageAll.css'

const ImageAll = () => {
    const {id} = useParams()
    const brews = useSelector((state) => state.breweries)
    const brewsArr = Object.values(brews)
    const filterBrewArr = brewsArr.filter((brew => brew?.id === +id))
    const images = useSelector((state) => state.images)
    const imageArr = Object.values(images)
    const filterImageArr = imageArr.filter((image => image?.brewery_id === +id))


    console.log(brewsArr)

    return (
        <div className='image-all-page'>
            <div>
            {filterBrewArr.map((brew) => (

                <div className='image-all-top'>
                    <h2>Photos for {brew.name}</h2>
                <div>
                    <ImageFormModal brew={brew} />
                </div>
                </div>
                    ))}
                <div className='image-matrix'>
                    {filterImageArr.map((image) => (
                        <div>
                            <img className='image-all' src={image.image} />
                        </div>
                    ))}
                </div>
                    </div>
        </div>
    );
}

export default ImageAll;
