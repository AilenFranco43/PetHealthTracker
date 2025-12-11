import "./index.css";

import SettingsPage from "./pages/SettingsPage";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import HealthPage from "./pages/HealthPage";
import HealthRecordDetailPage from "./pages/HealthRecordDetailPage.jsx";
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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

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
            <Route path="/health/record/:id" element={<HealthRecordDetailPage />} />
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
