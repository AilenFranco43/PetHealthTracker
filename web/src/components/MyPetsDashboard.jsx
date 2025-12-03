import React, { useState } from "react";
import PetList from "./pets/PetList";
import Modal from "./pets/Modal";
import PetForm from "./pets/PetForm";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { petsData } from "../../data/petsData"; // 🔥 IMPORTANTE

const MyPetsDashboard = () => {
  const pets = petsData; // 🔥 usamos el JSON centralizado

  const [modalOpen, setModalOpen] = useState(false);

  const openCreateModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Mis Mascotas</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PetList pets={pets} />

        <Link
          to="/pets"
          className="w-full border-2 border-dashed border-teal-500 rounded-2xl bg-teal-50 flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition-transform hover:scale-105 p-4"
        >
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Plus className="w-7 h-7 lg:w-8 text-emerald-600" />
          </div>
          <span className="text-teal-700 font-medium">Agregar mascota</span>
        </Link>
      </div>

      <Modal open={modalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Agregar Mascota</h2>
        <PetForm onSave={closeModal} onCancel={closeModal} />
      </Modal>
    </div>
  );
};

export default MyPetsDashboard;
