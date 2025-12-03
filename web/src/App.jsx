import "./index.css";

import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import HealthPage from "./pages/HealthPage";
import MainPage from "./pages/MainPage";
import NutritionSection from "./pages/NutritionSection";
import PetsSection from "./pages/PetsSection";
import PetProfilePage from "./pages/PetProfilePage.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* paginas publicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainPage />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/nutrition" element={<NutritionSection />} />
          <Route path="/pets" element={<PetsSection />} />
          <Route path="/pets/:id" element={<PetProfilePage />} />


          {/* agregar rutas del usuario aca */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
