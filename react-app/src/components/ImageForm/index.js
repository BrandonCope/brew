import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import ImageForm from './ImageForm';



export const ImageModalContext = createContext();
export const useImageModal = () => useContext(ImageModalContext)

function ImageFormModal({brew}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ImageModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      <button className='add-photo-button' onClick={() => setShowModal(true)}><i className="fa-solid fa-camera"></i> Add Photo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ImageForm brew={brew} />
            {/* <ImageForm brew={brew} review={review} /> */}
        </Modal>
      )}
    </ImageModalContext.Provider>
  );
}

export default ImageFormModal;
