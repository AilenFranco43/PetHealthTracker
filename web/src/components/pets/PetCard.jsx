import React from "react";
import { useNavigate } from "react-router-dom";

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
      onClick={() => navigate(`/pets/${pet.id}`)}
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{pet.name}</h2>
        <p className="text-sm text-gray-500">
          {pet.breed} • {pet.age}
        </p>
      </div>
    </div>
  );
};

export default PetCard;
