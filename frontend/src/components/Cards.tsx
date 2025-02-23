import { ReactElement } from "react";
import ShareIcon from "../icons/ShareIcon";
import DeleteIcon from "../icons/DeleteIcon";
import TwitterIcon from "../icons/TwitterIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import { motion } from "framer-motion";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
  id: string;
}

function Cards({ title, link, type, id }: CardProps) {
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
      className="p-4 bg-white rounded-md border-gray-200 border max-w-72 shadow-md flex flex-col h-auto self-starts"
    >
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2 font-semibold">
          {type === "twitter" && <GrayIcon icon={<TwitterIcon />} />}
          {type === "youtube" && <GrayIcon icon={<YoutubeIcon />} />}
          <div className="text-lg font-semibold">{title}</div>
        </div>
        <div className="flex items-center">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <GrayIcon icon={<ShareIcon />} />
          </a>
          <GrayIcon
            onClick={() => {
              handleDelete();
            }}
            icon={<DeleteIcon />} />
        </div>
      </div>
      <div className="flex-grow flex justify-center">
        {type === "youtube" && (
          // <iframe
          //   className="w-full h-auto aspect-video"
          //   src={link.replace("watch?v=", "embed/")}
          //   title={title}
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          //   referrerPolicy="strict-origin-when-cross-origin"
          //   allowFullScreen
          // ></iframe>
          <iframe className="w-full h-auto " src={`https://www.youtube.com/embed/${new URL(link).searchParams.get("v")}`}
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        )}

        {type === "twitter" && (
          <>
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
          </>
        )}
      </div>
    </motion.div>
  );
}

function GrayIcon({ icon, onClick }: { icon: ReactElement, onClick?: () => void }) {
  return <div onClick={onClick} className="text-gray-500 pr-2.5">{icon}</div>;
}

export default Cards;
