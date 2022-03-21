import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import ImageDetail from './ImageDetail';
import './ImageDetail.css'

export const ImageModalContext = createContext();
export const useImageDetailModal = () => useContext(ImageModalContext)

function ImageDetailModal({image}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <ImageModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      <button className="image-button" onClick={() => setShowModal(true)}><img className='image-all' src={image.image} /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
         <ImageDetail image={image} />
        </Modal>
      )}
    </ImageModalContext.Provider>
  );
}

export default ImageDetailModal;
