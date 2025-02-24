
import CloseIcon from "../icons/CloseIcon";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { motion } from "framer-motion";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
}

function CreateContentModal({ open, onClose, }: { open: boolean; onClose: () => void; }) {
  const [type, setType] = useState(ContentType.Youtube);
  const addContent = async () => {
    const title = document.querySelector('input[placeholder="Enter title"]') as HTMLInputElement;
    const link = document.querySelector('input[placeholder="Enter link"]') as HTMLInputElement;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      title: title.value,
      link: link.value,
      type: type,
    }, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      }

    })
    onClose();
  }
  return (
    <>
      {open && (
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: .5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-200 left-0 top-0 fixed w-full h-full  backdrop-filter backdrop-blur-lg flex justify-center items-center"

          >

          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .3 }}
            className=" w-full h-full left-0 top-0 fixed flex justify-center items-center" onClick={onClose}>
            <span
              className=" bg-purple-bg text-amber-50 p-4 rounded-md flex flex-col w-80 "
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                className="flex justify-end hover:cursor-pointer"
                onClick={onClose}
              >
                <CloseIcon />
              </div>
              <h1>Title</h1>
              <Input placeholder="Enter title" />
              <h1>Link</h1>
              <Input placeholder="Enter link" />
              <h1>Type</h1>
              <div className="flex justify-center items-center gap-2 ">
                <Button
                  onClick={() => setType(ContentType.Youtube)}
                  variant={type === ContentType.Youtube ? "primary" : "secondary"} innerText="Youtube" />
                <Button
                  onClick={() => setType(ContentType.Twitter)}
                  variant={type === ContentType.Twitter ? "primary" : "secondary"} innerText="Twitter" />
                <Button
                  onClick={() => setType(ContentType.Instagram)} variant={type === ContentType.Instagram ? "primary" : "secondary"} innerText="Instagram" />
              </div>

              <div className="flex justify-center  items-center pt-5 transition-all duration-500 ease-in-out">
                <Button onClick={addContent} variant="primary" innerText=" Create new " />
              </div>
            </span>
          </motion.div>
        </div>
      )}
    </>
  );
}
function Input({
  onChange,
  placeholder,
}: {
  onChange?: () => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border-2  border-white rounded-md p-2 m-2"
      onChange={onChange}
    />
  );
}
export default CreateContentModal;
