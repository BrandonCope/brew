import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import ImageForm from './ImageForm';



export const ImageModalContext = createContext();
export const useImageModal = () => useContext(ImageModalContext)

function ImageFormModal({brew}) {
  const [showModal, setShowModal] = useState(false);
    console.log(brew)
    
  return (
    <ImageModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      <button className='ImageFormButton' onClick={() => setShowModal(true)}>Add Photo</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <h2>Hello from image form</h2>
            <ImageForm brew={brew} />
            {/* <ImageForm brew={brew} review={review} /> */}
        </Modal>
      )}
    </ImageModalContext.Provider>
  );
}

export default ImageFormModal;
