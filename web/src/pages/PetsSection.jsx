import React, { useState } from "react";
import PetList from "../components/pets/PetList";
import AddPetBtn from "../components/pets/AddPetBtn";
import Modal from "../components/pets/Modal";
import PetForm from "../components/pets/PetForm";
import { Search } from "lucide-react";
import PetProfile from "../components/pets/PetProfile"; // <-- asegúrate de importar el perfil

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

  const pets = [
    {
      id: 1,
      name: "Luna",
      breed: "Golden Retriever",
      age: "3 años",
      image: "/dog-example.jpg",
      species: "Perro",
      weight: "25 kg",
    },
    {
      id: 2,
      name: "Milo",
      breed: "Gato",
      age: "2 años",
      image: "/cat-example.jpg",
      species: "Gato",
      weight: "4 kg",
    },
  ];

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
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
              placeholder="Buscar mascota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-10 py-2 bg-white/20 backdrop-blur-lg border-0 
                text-white placeholder:text-emerald-100 rounded-xl 
                outline-none text-sm md:text-base"
            />
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
        <PetList pets={filteredPets} onSelectPet={openPetProfile} />
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
