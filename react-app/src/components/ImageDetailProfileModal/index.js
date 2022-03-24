import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import ImageProfileDetail from './ImageProfileDetail';
// import './ImageDetail.css'

export const ImageProfileModalContext = createContext();
export const useImageDetailProfileModal = () => useContext(ImageProfileModalContext)

function ImageDetailProfileModal({image}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ImageProfileModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      <button className="image-button" onClick={() => setShowModal(true)}><img alt='matrix-modal-pic' className='image-all' src={image.image} /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
         <ImageProfileDetail image={image} />
        </Modal>
      )}
    </ImageProfileModalContext.Provider>
  );
}

export default ImageDetailProfileModal;
