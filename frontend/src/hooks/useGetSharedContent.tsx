import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useLocation } from "react-router-dom";



export const useGetSharedContent = () => {
    const [sharedContent, setSharedContent] = useState([]);
    const [err, setErr] = useState("")
    const [username ,setUsername] = useState("");
    const location = useLocation();

    const refresh = () => {
        

        // Extract the hash after "/share/"
        const hash = location.pathname.match(/\/share\/(.+)/);
        // console.log(hash[1]);
        if (hash) {
            axios.get(`${BACKEND_URL}/api/v1/brain/${hash[1]}`)
                .then(res => {
                    setSharedContent(res.data.content);
                    setUsername(res.data.username);
                    console.log(res.data.content);
                })
                .catch(err => setErr(err.message));

           
        }
    }
    useEffect(() => {
        refresh();
        const interval = setInterval(() => {
            refresh();
        }, 15*1000);

        return () => {
            clearInterval(interval);
        }
    },[])
    return {sharedContent , username ,err};
}