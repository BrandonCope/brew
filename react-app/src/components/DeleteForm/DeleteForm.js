import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { useDeleteModal } from '.';
import { deleteBrewery, getBrews } from '../../store/brews';
import { deleteImage } from '../../store/images';
import { deleteReview } from '../../store/reviews';
import './DeleteForm.css'

const DeleteForm = ({review, image, brew}) => {
    const {setShowModal} = useDeleteModal()
    const dispatch = useDispatch();
    const history = useHistory();


    const cancelClick = (e) => {
      e.preventDefault()
      setShowModal(false)
  }
    const deleteElemenent = (e) => {
        e.preventDefault()
        if (review) dispatch(deleteReview(review.id))
        if (image) dispatch(deleteImage(image.id))
        if (brew) {
            dispatch(getBrews())
            dispatch(deleteBrewery(brew.id))
            history.push(`/profiles/brews`)
        }
    };


    return (
      <div className='delete-confirm-body'>
                <h1 className="app-title">Are You sure you want to delete?</h1>
                <div className='delete-confirm-buttons-div'>
                    <button className='reviewFormButton' onClick={deleteElemenent}>Yes, Delete</button>
                    <button className='reviewFormButton' onClick={cancelClick}>Cancel</button>
          </div>
<div className='close-modal-button'><button onClick={cancelClick} className='add-photo-button'><i className="fa-solid fa-xmark"></i></button></div>
        </div>
    )
}

export default DeleteForm
