import React from "react";

interface PopUpProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ open, onConfirm, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-96 bg-amber-300 border-2 border-amber-900 rounded-xl p-6 text-center">
        <h1 className="text-xl font-bold mb-4">Konfirmasi</h1>
        <p className="mb-6">Buka nomor antrean di tab baru?</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Batal
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-emerald-600 text-white"
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
