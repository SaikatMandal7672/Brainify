import { Instagram, LogOut } from "lucide-react";
import BrainIcon from "../icons/BrainIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItems from "./SidebarItems";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const Sidebar = () => {
    const navigate = useNavigate()
    const logOut =()=>{
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white h-screen border border-r-2 border-gray-300 fixed">
            <div className="sm:p-4 p-2">
                <div className="text-2xl font-semibold text-purple-600 flex items-center gap-2">{<BrainIcon />}
                    <div className="hidden sm:flex">Brainify</div>
                </div>
            </div>
            <ul className="mt-4 flex justify-center flex-col">
                <li className="sm:p-4 p-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 "><SidebarItems title="Tweets" icon={<TwitterIcon />} /></li>
                <li className="sm:p-4 p-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 "><SidebarItems title="YouTube" icon={<YoutubeIcon />} /></li>
                <li className="sm:p-4 p-2 hover:bg-gray-100 cursor-pointer transition-all duration-300 "><SidebarItems title="Instagram" icon={<Instagram strokeWidth={1} />} /></li>
                
            </ul>
            <div 
            onClick={logOut}
            className="absolute w-full sm:p-4 p-2 bottom-0 hover:bg-gray-100 cursor-pointer transition-all duration-300 "><SidebarItems title="Logout" icon={<LogOut strokeWidth={1}/>} /></div>
        </motion.div>
    );
};

export default Sidebar;