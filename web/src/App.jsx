import "./index.css";

import SettingsPage from "./pages/SettingsPage";
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
import Reminders from "./pages/Reminders.jsx";
import { AuthContext, AuthProvider } from "./context/AuthContext.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <Routes>
          {/* paginas publicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/nutrition" element={<NutritionSection />} />
            <Route path="/pets" element={<PetsSection />} />
            <Route path="/pets/:id" element={<PetProfilePage />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/configuration" element={<SettingsPage />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
