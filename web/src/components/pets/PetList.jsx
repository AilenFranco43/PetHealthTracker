import React from "react";
import PetCard from "./PetCard";

const PetList = ({ pets, onSelectPet }) => {
  return (
    <>
      {pets.map((pet) => (
        <PetCard 
          key={pet.id} 
          pet={pet}
           onClick={() => onSelectPet(pet)}
        />
      ))}
    </>
  );
};

export default PetList;
