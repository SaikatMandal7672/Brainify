import { Instagram } from "lucide-react";
import BrainIcon from "../icons/BrainIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import SidebarItems from "./SidebarItems";
import { motion } from "framer-motion";
 export const Sidebar= () => {
    return (
        <motion.div 
        initial={{x:-300,opacity:0}}
        animate={{x:0 ,opacity:1 }}
        transition={{duration:0.3}}
        className="bg-white h-screen border border-r-2 border-gray-300 fixed">
            <div className="p-4">
                <h1 className="text-2xl font-semibold text-purple-600 flex items-center gap-2">{<BrainIcon/>} Second Brain</h1>
            </div>
            <ul className="mt-4">
                <li className="p-4 hover:bg-gray-100 cursor-pointer transition-all duration-300 "><SidebarItems title="Tweets" icon={<TwitterIcon/>}/></li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer transition-all duration-300 "><SidebarItems title="YouTube" icon={<YoutubeIcon/>}/></li>
                <li className="p-4 hover:bg-gray-100 cursor-pointer transition-all duration-300 "><SidebarItems title="Instagram" icon={<Instagram/>}/></li>
            </ul>
        </motion.div>
    );
};

export default Sidebar;