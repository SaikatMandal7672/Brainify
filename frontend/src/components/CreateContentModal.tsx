
import CloseIcon from "../icons/CloseIcon";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
// enum ContentType {
//   Youtube = "youtube",
//   Twitter = "twitter",
// }

function CreateContentModal({ open, onClose, }: { open: boolean; onClose: () => void; }) {
  const addContent = async () => {
    const title = document.querySelector('input[placeholder="Enter title"]') as HTMLInputElement;
    const link = document.querySelector('input[placeholder="Enter link"]') as HTMLInputElement;
    const type = document.querySelector('input[placeholder="Enter type : Youtube or Twitter"]') as HTMLInputElement;
    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      title: title.value,
      link: link.value,
      type: type.value,
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
          <div
            className="bg-gray-200 left-0 top-0 fixed w-full h-full opacity-50 backdrop-filter backdrop-blur-xl flex justify-center items-center"

          >

          </div>
          <div className=" w-full h-full left-0 top-0 fixed flex justify-center items-center" onClick={onClose}>
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
              <Input placeholder="Enter type : Youtube or Twitter" />
              <div className="flex justify-center  items-center pt-5">
                <Button onClick={addContent} variant="secondary" innerText=" Create new " />
              </div>
            </span>
          </div>
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
