import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';
import { FaStar } from 'react-icons/fa'


export const ReviewModalContext = createContext();
export const useReviewModal = () => useContext(ReviewModalContext)

function ReviewFormModal({brew}) {
  const [showModal, setShowModal] = useState(false);
    console.log(brew)
  return (
    <ReviewModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      <button className='reviewFormButton' onClick={() => setShowModal(true)}><i class="fa-regular fa-star"></i> Write A Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
         <ReviewForm brew={brew} />
        </Modal>
      )}
    </ReviewModalContext.Provider>
  );
}

export default ReviewFormModal;
