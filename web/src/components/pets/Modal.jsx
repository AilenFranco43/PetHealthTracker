const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start sm:items-center p-4 z-30">
      <div
        className="
          bg-white mt-[90px] sm:mt-0 rounded-xl shadow-xl w-full max-w-lg relative p-4 sm:p-6 max-h-[80vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
