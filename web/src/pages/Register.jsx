import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import InputForm from "../components/InputForm";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Campos vacíos
    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      return setError("Todos los campos son obligatorios");
    }

    // Mínimo de caracteres para nombre
    if (form.username.length < 3) {
      return setError("El nombre debe tener al menos 3 caracteres");
    }

    // Email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return setError("Ingrese un correo electrónico válido");
    }

    // Contraseña mínima
    if (form.password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres");
    }

    // Validar confirmación
    if (form.password !== form.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    setError(null);

    try {
      await register(form.username, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl w-full max-w-md bg-white/90 backdrop-blur shadow-2xl p-8">
        <div className="text-center mb-3">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <FaHeart size={35} color="white" />
          </div>

          <h1 className="text-2xl mb-2 text-gray-900">Crear cuenta</h1>
          <p className="text-gray-600">Comienza a cuidar a tus mascotas</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 space-y-4">
          <InputForm
            id="username"
            name="username"
            label="Nombre y Apellido"
            labelIcon={<FaUser />}
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder=""
          />

          <InputForm
            id="email"
            name="email"
            label="Correo electrónico"
            labelIcon={<FaEnvelope />}
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tú@correo.com"
          />

          <InputForm
            id="password"
            name="password"
            label="Contraseña"
            labelIcon={<FaLock />}
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="•••••••"
          />

          <InputForm
            id="confirmPassword"
            name="confirmPassword"
            label="Repetir contraseña"
            labelIcon={<FaLock />}
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="•••••••"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-9 px-4 has-[>svg]:px-3 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl py-6 shadow-lg shadow-emerald-200"
          >
            Crear cuenta
          </button>
        </form>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm shadow">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-6 mt-2">
          <div className="flex items-center w-full max-w-xs gap-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="w-2 h-2 rounded-full border border-gray-300"></div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
          }}
            type="button"
            className="w-full flex items-center justify-center gap-2 max-w-xs py-3 px-4 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50"
          >
            <FcGoogle /> Registrarse con Google
          </button>

          <p className="text-sm text-emerald-600">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="hover:text-emerald-700">
              Iniciar Sesión
            </Link>
          </p>

          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 mt-3"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
