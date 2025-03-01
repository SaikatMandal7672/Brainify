import { ReactElement, useEffect, useState } from "react";
import ShareIcon from "../icons/ShareIcon";
import DeleteIcon from "../icons/DeleteIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import { motion } from "framer-motion";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContent";
import { InstagramEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed"
import { Instagram } from "lucide-react";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "instagram";
  id: string;
  page?: string;
}

function Cards({ title, link, type, id, page }: CardProps) {
  const { refresh } = useContent();
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidthWindow(window.innerWidth);
    
    window.addEventListener("resize", handleResize);
    console.log(typeof(widthWindow));
    return () => window.removeEventListener("resize", handleResize);
    
  }, [widthWindow]);


  const handleDelete = async () => {
    await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      data: {
        contentId: id,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      }

    },
    )

  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="sm:p-4 p-2  bg-white rounded-md border-gray-200 border max-w-auto shadow-lg flex flex-col"
    >
      <div className="flex justify-between sm:mb-4 mb-2">
        <div className="flex items-center gap-2 font-semibold">
          {type === "twitter" && <GrayIcon icon={<TwitterIcon />} />}
          {type === "youtube" && <GrayIcon icon={<YoutubeIcon />} />}
          {type === "instagram" && <GrayIcon icon={<Instagram />} />}
          <div className="text-lg font-semibold">{title}</div>
        </div>
        <div className="flex items-center">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <GrayIcon icon={<ShareIcon />} />
          </a>
          {!page &&
            <GrayIcon

              onClick={() => {
                handleDelete();
                refresh();
              }}
              icon={<DeleteIcon />}
              className="cursor-pointer" />
          }

        </div>
      </div>
      <div className="flex-grow flex justify-center ">
        {type === "youtube" && (
          (widthWindow>780 &&
            
            <YouTubeEmbed url={link} height={widthWindow/5} width={widthWindow/4}  className="row-span-2" />
          )
           ||
          (widthWindow > 400 && 
            <YouTubeEmbed url={link} height={widthWindow*4/10} width={widthWindow*2/3} className="row-span-2"/>
           )||
           (widthWindow && 
            <YouTubeEmbed url={link} height={150} width={250} className="row-span-2"/>
           )

        )}

        {type === "twitter" && (
          <XEmbed url={link} className="sm:w-[300px] w-[250px]" />
        )}
        {type === "instagram" &&
          <InstagramEmbed url={link}  />
        }
      </div>
    </motion.div>
  );
}

function GrayIcon({ icon, onClick, className }: { icon: ReactElement, onClick?: () => void, className?: string }) {
  const classname = "text-gray-500 pr-2.5 " + className;
  return <div onClick={onClick} className={classname}>{icon}</div>;
}

export default Cards;
