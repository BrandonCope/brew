import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';


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
      <button className='reviewFormButton' onClick={() => setShowModal(true)}>Write A Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <h2>Hello from review form</h2>
         <ReviewForm brew={brew} />
        </Modal>
      )}
    </ReviewModalContext.Provider>
  );
}

export default ReviewFormModal;
