import { Weight } from "lucide-react";

export const petsData = [
  {
    id: "1",
    name: "Luna",
    specie: "Perro",
    breed: "Golden Retriever",
    weight: "20 kg",
    age: "3 años",
    image: "/dog-example.jpg",
    recentRecords: [
      {
        id: "1",
        title: "Vacuna anual aplicada",
        date: "10 Nov 2025",
        status: "completed",
      },
      {
        id: "2",
        title: "Control general",
        date: "01 Nov 2025",
        status: "completed",
      },
    ],
  },
  {
    id: "2",
    name: "Milo",
    specie: "Gato",
    breed: "Gato",
    weight: "5 kg",
    age: "2 años",
    image: "/cat-example.jpg",
    recentRecords: [
      {
        id: "3",
        title: "Desparasitación",
        date: "08 Nov 2025",
        status: "completed",
      },
    ],
  },
];
