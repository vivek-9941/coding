import {createContext, useEffect, useRef, useState} from "react";
import {checkAuthSync} from "../Utility/TokenValidation.js";
import {useUser} from "./UserContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";

export const CodeforcesContext = createContext(null)
const CodeforcesProvider = ({children}) =>{
    const [data ,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const isAuth = checkAuthSync();
    //here it will be mounted after leetcode context  so no need to check for jwt token and navigate in anycase
    const {user} = useUser();
    const hasFetched = useRef(false); // Track if we've fetched already

    const fetchCodeforces  = async() =>{
        setLoading(true);
        const token =  localStorage.getItem("token")
        try{
        const response =  await  axios.post(`http://localhost:8080/api/codeforces/get?handle=${user.cfhandle}`,
            user,
            {
            headers:{
                Authorization:`Bearer ${token}`
            }
            });

          if(response.status === 200){
              toast.success("Codeforces successfully loaded!");
              setData(response.data);
              console.log(response);
          }
        }
        catch(error){
            setError(error);
            if(error.response.status === 404){
                toast.error(error.response.data.message)
            }
            if(error.response.status === 401){
                if(!isAuth) {
                    window.location.href = "http://localhost:8080/oauth2/authorization/google";
                }
            }
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (user && !data && !hasFetched.current) {
            hasFetched.current = true;
            fetchCodeforces();
        }
    }, []);

    return (
       < CodeforcesContext.Provider value={{data, loading, error , refresh: fetchCodeforces}}>
           {children}
       </CodeforcesContext.Provider>
    )


}
export default CodeforcesProvider;