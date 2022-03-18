import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ImageAll = () => {
    const {id} = useParams()
    const images = useSelector((state) => state.images)
    const imageArr = Object.values(images)
    const filterImageArr = imageArr.filter((image => image?.brewery_id === +id))


    console.log(filterImageArr)

    return (
        <div >
            <h1>Hello From Image All</h1>
            {filterImageArr.map((image) => (
                <div>
                    <img src={image.url} />
                </div>
            ))}
        </div>
    );
}

export default ImageAll;
