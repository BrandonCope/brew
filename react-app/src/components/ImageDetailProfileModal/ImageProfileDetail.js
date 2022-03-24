import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImageDetailProfileModal } from ".";
import { deleteImage } from "../../store/images";

const ImageProfileDetail = ({image}) => {
    const {setShowModal} = useImageDetailProfileModal()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.session.user)


    const removeImage = (e) => {
        e.preventDefault()
        dispatch(deleteImage(image?.id))
    }

    const cancelClick = (e) => {
        e.preventDefault()
        setShowModal(false)
    }

    return (
        <>
        <div className="image-modal-div">
            <div className="image-modal-top">
                <div>
                    <div className="image-modal-top-detail">
                    <h3>At: {image.brew_name}</h3>
                    <p>{image.created_at.slice(0,17)}</p>
                    {user?.id === image?.user_id ? <button onClick={removeImage} className='add-photo-button'>Delete Image</button> : <></>}
                    </div>
                </div>
                <div><button onClick={cancelClick} className='add-photo-button'><i className="fa-solid fa-xmark"></i></button></div>
            </div>
            <div className="image-modal-bottom">
                <img alt="brewery-pic" className="detail-content" src={image.image}/>
            </div>
        </div>
        </>
    )
}

export default ImageProfileDetail
