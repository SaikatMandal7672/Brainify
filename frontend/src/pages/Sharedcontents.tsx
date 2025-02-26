import Cards from "../components/Cards";
import { motion } from "framer-motion";
import { useGetSharedContent } from "../hooks/useGetSharedContent";


function Sharedcontents() {
  const { sharedContent, username, err } = useGetSharedContent();



  return (<>
    <div className="min-h-screen w-full bg-[#05061e] p-10 pl-32 pr-32" >
      {
      !err && <><motion.h1
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="  text-3xl pb-10 font-semibold  text-blue-200">
        Veiwing contents of  {username}
      </motion.h1>


        <div className="flex flex-wrap gap-4 items-start bg-[#2c2a51] p-4 rounded-lg w-full">
          {
            sharedContent?.map(({ title, link, type, _id }) => {
              return (
                <Cards
                  link={link}
                  type={type}
                  title={title}
                  id={_id}
                  page="share"
                />
              )
            })
          }
        </div></>
        }
        {
          err && <div className="text-blue-100 text-center text-4xl bg-blue-950 p-10 rounded-lg">
            Oops! It looks like this shared link is no longer accessible. The owner has disabled sharing.
          </div>
        }

    </div>



  </>
  )
}

export default Sharedcontents