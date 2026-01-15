import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const showBack = location.pathname !== "/";

  return (
    <div className="fixed top-0 inset-x-0 z-40 bg-white/70 backdrop-blur-md border-b border-[#0F3D2E]/10 h-14 flex items-center px-3 sm:px-6 lg:px-10">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="mr-2 p-1 rounded-md hover:bg-[#0F3D2E]/10 transition"
        >
          <ChevronLeft className="w-5 h-5 text-[#0F3D2E]" />
        </button>
      )}

      <h1 className="text-lg sm:text-xl font-bold text-[#0F3D2E]">
        SplitBuddy
      </h1>
    </div>
  );
}
