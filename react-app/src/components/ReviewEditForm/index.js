import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import ReviewEditForm from './ReviewEditForm';


export const ReviewEditModalContext = createContext();
export const useReviewEditModal = () => useContext(ReviewEditModalContext)

function ReviewEditFormModal({review}) {
  const [showModal, setShowModal] = useState(false);

   
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
            <ReviewEditForm review={review} />
        </Modal>
      )}
    </ReviewEditModalContext.Provider>
  );
}

export default ReviewEditFormModal;
