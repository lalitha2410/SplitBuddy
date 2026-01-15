import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="hero-center pt-28 bg-[#EEF8F1]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="
          bg-white/70 backdrop-blur-lg 
          border border-[#0F3D2E]/15 shadow-lg 
          rounded-2xl 
          max-w-lg w-full 
          p-8 space-y-5
        "
      >
        <h1 className="text-3xl font-bold text-center text-[#0F3D2E]">
          SplitBuddy
        </h1>
        <p className="text-[#0F3D2E]/80 text-center">
          Smart and fair expense splitting for trips & roommates.
        </p>
        <div className="flex justify-center">
          <Link
            to="/group/create"
            className="bg-[#0F3D2E] text-white px-5 py-2.5 rounded-xl hover:bg-[#0D3328] transition font-medium"
          >
            + Create Group
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
