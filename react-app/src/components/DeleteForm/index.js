import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import DeleteForm from './DeleteForm';


export const DeleteModalContext = createContext();
export const useDeleteModal = () => useContext(DeleteModalContext)

function DeleteFormModal({review, image, brew}) {
  const [showModal, setShowModal] = useState(false);

  let deleteButton;
  if (review || image) {
    deleteButton = <button className='reviewFormButton' onClick={() => setShowModal(true)}>Delete</button>
  } else {
    deleteButton = <button className='reviewFormButton' onClick={() => setShowModal(true)}>Delete Page</button>
  }

  return (
    <DeleteModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      {deleteButton}
      {/* <button className='reviewFormButton' onClick={() => setShowModal(true)}>Delete</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
         <DeleteForm review={review} image={image} brew={brew}/>
        </Modal>
      )}
    </DeleteModalContext.Provider>
  );
}

export default DeleteFormModal;
