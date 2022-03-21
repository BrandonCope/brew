import React, { useState, createContext, useContext } from 'react';
import { Modal } from '../../context/Modal';
import BreweryEditForm from './BreweryEditForm';


export const EditModalContext = createContext();
export const useEditModal = () => useContext(EditModalContext)

function BreweryEditFormModal({brew}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <EditModalContext.Provider
      value={{
        showModal,
        setShowModal
      }}
    >
      <button className="EditDetailFormButton" onClick={() => setShowModal(true)}>Edit Details</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
         <BreweryEditForm brew={brew} />
        </Modal>
      )}
    </EditModalContext.Provider>
  );
}

export default BreweryEditFormModal;
