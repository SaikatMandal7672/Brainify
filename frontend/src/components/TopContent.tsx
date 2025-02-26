import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { Button } from "./Button";
import { motion } from "framer-motion";
import axios from "axios";
import { BACKEND_URL, FRONTEND_URL } from "../config";

import { useState } from "react";


function TopContent({ onClick }: { onClick: () => void }) {
  const [share, setShare] = useState(false);


  async function handleShare() {
    setShare(true);
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      "share": true,
    }, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      }
    })

    const shareUrl = `${FRONTEND_URL}/share/${response.data.hash}`;

    // navigate(`/share/${response.data.hash} `);
    await navigator.clipboard.writeText(shareUrl);

    alert("Link copied to clipboard : " + shareUrl);


  }
  async function handleDisableShare() {
    setShare(false);
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      "share": false,
    }, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      }
    })

    alert(response.data.message);
  }
  return (

    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex justify-between mb-9">
      <h2 className="text-3xl font-bold">All Notes</h2>
      <div className=" flex justify-end gap-2">
        <Button
          onClick={onClick}
          variant="primary"
          innerText="Add Content"
          startIcon={<PlusIcon />}
        />
        <Button
          onClick={handleShare}
          variant="secondary"
          innerText="Share"
          startIcon={<ShareIcon />}
        />
        {share && <Button
          onClick={handleDisableShare}
          variant="secondary"
          innerText="Disable Share"

        />}
      </div>
    </motion.div>
  );
}

export default TopContent;
