import React, { useState } from "react";
import PetList from "../components/pets/PetList";
import AddPetBtn from "../components/pets/AddPetBtn";
import Modal from "../components/pets/Modal";
import PetForm from "../components/pets/PetForm";
import { Search } from "lucide-react";
import PetProfile from "../components/pets/PetProfile";
import { petsData } from "../../data/petsData"; 

const PetsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Modal para crear mascota
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Modal para ver perfil
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const openPetProfile = (pet) => {
    setSelectedPet(pet);
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setSelectedPet(null);
    setProfileModalOpen(false);
  };

 
  const pets = petsData;

  // Filtrado mejorado - actualizado para usar las propiedades correctas
  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pet.breed && pet.breed.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pet.specie && pet.specie.toLowerCase().includes(searchQuery.toLowerCase())) // Cambiado de species a specie
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      
      {/* HEADER */}
      <div className="mb-6 text-white bg-gradient-to-br from-emerald-500 to-teal-600 p-4 md:p-6 lg:p-8 rounded-2xl lg:rounded-3xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Mis mascotas
          </h1>

          {/* SEARCH */}
          <div className="relative w-full max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-200" />
            <input
              type="text"
              placeholder="Buscar por nombre, raza o especie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-10 py-2 bg-white/20 backdrop-blur-lg border-0 
                text-white placeholder:text-emerald-100 rounded-xl 
                outline-none text-sm md:text-base"
            />
            {/* Mostrar contador de resultados */}
            {searchQuery && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-100 bg-emerald-600/30 px-2 py-1 rounded">
                {filteredPets.length} resultado{filteredPets.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADD PET BUTTON */}
      <div className="w-full mb-8">
        <AddPetBtn onClick={openCreateModal} />

        {/* MODAL CREAR MASCOTA */}
        <Modal open={createModalOpen} onClose={closeCreateModal}>
          <h2 className="text-lg md:text-xl font-bold mb-4">Agregar Mascota</h2>
          <PetForm onSave={closeCreateModal} onCancel={closeCreateModal} />
        </Modal>
      </div>

      {/* PETS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-2 md:px-6 lg:px-10">
        {filteredPets.length > 0 ? (
          <PetList pets={filteredPets} onSelectPet={openPetProfile} />
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-12 h-12 mx-auto text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {searchQuery ? "No se encontraron mascotas" : "No hay mascotas registradas"}
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No hay resultados para "${searchQuery}"`
                : "Agrega tu primera mascota haciendo clic en el botón arriba"}
            </p>
          </div>
        )}
      </div>

      {/* MODAL PERFIL DE MASCOTA */}
      <Modal open={profileModalOpen} onClose={closeProfileModal}>
        {selectedPet && (
          <PetProfile
            pet={selectedPet}
            onBack={closeProfileModal}
            onViewRecords={() => console.log("Ver registros")}
          />
        )}
      </Modal>
    </div>
  );
};

export default PetsSection;