import { useParams } from "react-router-dom";
import PetProfile from "../components/pets/PetProfile";

export default function PetProfilePage() {
  const { id } = useParams();

  return <PetProfile petId={id} />;
}
