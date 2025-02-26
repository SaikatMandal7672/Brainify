import { ReactElement } from "react";
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
      className="p-4 bg-white rounded-md border-gray-200 border max-w-auto shadow-md flex flex-col h-auto self-starts"
    >
      <div className="flex justify-between mb-4">
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
      <div className=" flex-grow flex justify-center">
        {type === "youtube" && (
          <div className="w-full h-auto flex justify-center">
            {/* <iframe className="w-full h-auto "
              // src={`https://www.youtube.com/embed/${new URL(link).searchParams.get("v")}`}
              src={getYouTubeEmbedUrl(link)}
              title={title}
              frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}


            <YouTubeEmbed url={link} height={200} width={300} />
          </div>

        )}

        {type === "twitter" && (
          <XEmbed url={link} width={300} />
        )}
        {type === "instagram" &&
          <InstagramEmbed url={link} width={328} />
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
