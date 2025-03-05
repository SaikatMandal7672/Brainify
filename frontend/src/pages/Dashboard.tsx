import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import CreateContentModal from "../components/CreateContentModal";
import TopContent from "../components/TopContent";
import Sidebar from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const { content, refresh } = useContent();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  useEffect(() => {
    refresh();
  }, [openModal])




  return (
    <>
      <div className=" bg-gray-200 h-full">
        <Sidebar />
        <div className="p-5 min-h-screen ml-10 sm:ml-52">
          <TopContent onClick={() => setOpenModal(true)} />
          <div className="flex gap-4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
              {
                content.map(({ title, link, type, _id }) => {
                  return (
                    <Cards
                      
                      link={link}
                      type={type}
                      title={title}
                      id={_id}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <CreateContentModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </>
  );
}

export default Dashboard;
