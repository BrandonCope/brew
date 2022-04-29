import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { useDeleteModal } from '.';
import { deleteBrewery, getBrews } from '../../store/brews';
import { deleteCool } from '../../store/cool';
import { deleteFunny } from '../../store/funny';
import { deleteImage } from '../../store/images';
import { deleteReview } from '../../store/reviews';
import { deleteUseful } from '../../store/useful';
import './DeleteForm.css'

const DeleteForm = ({review, image, brew}) => {
    const {setShowModal} = useDeleteModal()
    const dispatch = useDispatch();
    const history = useHistory();

    const useful = useSelector((state) => state.useful)
    const funny = useSelector((state) => state.funny)
    const cool = useSelector((state) => state.cool)

    const usefulArr = Object.values(useful)
    const funnyArr = Object.values(funny)
    const coolArr = Object.values(cool)

    const filterUsefulArr = usefulArr.filter((useful) => useful?.review_id === review?.id)
    const filterFunnyArr = funnyArr.filter((funny) => funny?.review_id === review?.id)
    const filterCoolArr = coolArr.filter((cool) => cool?.review_id === review?.id)


    const cancelClick = (e) => {
      e.preventDefault()
      setShowModal(false)
  }
    const deleteElemenent = async e => {
        e.preventDefault()
        if (review) {

            filterUsefulArr.forEach(useful => {
                dispatch(deleteUseful(useful?.id))
            })
            filterFunnyArr.forEach(funny => {
                dispatch(deleteFunny(funny?.id))
            })
            filterCoolArr.forEach(cool => {
                dispatch(deleteCool(cool?.id))
            })

            await dispatch(deleteReview(review.id))
        }
        if (image) {
            const formData = new FormData();
            formData.append('image', image.url)
            dispatch(deleteImage(image.id, formData))
            dispatch(getBrews())
        }
        if (brew) {

            brew.images.forEach(image => {
                const formData = new FormData();
                formData.append('image', image.url)
                dispatch(deleteImage(image.id, formData))
                // dispatch(deleteImage(image.id))
            })

            await dispatch(deleteBrewery(brew.id))
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
