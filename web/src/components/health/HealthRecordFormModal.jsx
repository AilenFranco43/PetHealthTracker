import Modal from "../common/Modal";
import HealthRecordForm from "./HealthRecordForm";

export default function HealthRecordFormModal({ open, onClose, activeTab, onSubmit }) {
    if (!open) return null; 
  return (
    <Modal open={open} onClose={onClose} className="p-0">
      <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
        <h2 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
      </div>
      <HealthRecordForm activeTab={activeTab} onClose={onClose} onSubmit={onSubmit} />
    </Modal>
  );
}
