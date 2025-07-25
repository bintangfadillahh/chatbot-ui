import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>Hapus Riwayat Chat?</h3>
        <p>Anda akan menghapus riwayat chat ini. Apakah Anda yakin?</p>
        <div className="modal-buttons">
          <button className="modal-button cancel" onClick={onClose}>
            Batal
          </button>
          <button className="modal-button confirm" onClick={onConfirm}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;