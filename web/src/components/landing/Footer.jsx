import Logo from "../Logo";

function Copyright() {
  return (
    <p className="text-xs sm:text-sm text-center">
      © 2025 Pet Health Tracker. Hecho con ❤️ para dueños de mascotas en todas partes.
    </p>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <Copyright />
        </div>
      </div>
    </footer>
  );
}

export default Footer