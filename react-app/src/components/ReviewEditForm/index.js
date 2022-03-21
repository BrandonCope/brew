import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import ReviewEditForm from './ReviewEditForm';


export const ReviewEditModalContext = createContext();
export const useReviewEditModal = () => useContext(ReviewEditModalContext)

function ReviewEditFormModal({brew, review}) {
  const [showModal, setShowModal] = useState(false);
    console.log(brew)
    console.log(review)
  return (
    <ReviewEditModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      <button className='reviewFormButton' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ReviewEditForm brew={brew} review={review} />
        </Modal>
      )}
    </ReviewEditModalContext.Provider>
  );
}

export default ReviewEditFormModal;
