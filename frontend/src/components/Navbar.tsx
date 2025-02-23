import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCapIcon } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-filter backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCapIcon className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-xl text-purple-600">Brainify</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-[#5147E4]">
              Features
            </a>
            <a href="#docs" className="text-gray-600 hover:text-[#5147E4]">
              Docs
            </a>
            <a href="#blog" className="text-gray-600 hover:text-[#5147E4]">
              Blog
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="px-4 py-2 rounded-lg text-[#4642ff] hover:bg-gray-100 transition-colors">
            Log in
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-gray-800 transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
