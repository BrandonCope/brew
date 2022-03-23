import React from "react";


import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import BreweryDeleteForm from './BreweryDeleteForm';


export const DeleteModalContext = createContext();
export const useDeleteModal = () => useContext(DeleteModalContext)

function BreweryDeleteFormModal({brew}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <DeleteModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      <button className="DeleteDetailFormButton" onClick={() => setShowModal(true)}>Delete Page</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
         <BreweryDeleteForm brew={brew} />
        </Modal>
      )}
    </DeleteModalContext.Provider>
  );
}

export default BreweryDeleteFormModal;
