import { createContext, useEffect, useState } from "react";
import axios from "axios" ;
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {


const currencySymbol = '$'
 const backendUrl = import.meta.env.VITE_BACKEND_URL

 const [doctors, setDoctors] = useState([])
const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

 

     // Fetch all public doctor profiles for the client facing portal
    const getDoctorsData = async () => {
        try {
            //  Fetch public profile records from the database
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            
            if (data.success) {
                //  Synchronize state with fresh profile data arrays
                setDoctors(data.doctors);
            } else {
                toast.error(data.message || "Failed to retrieve doctors data.");
            }
        } catch (error) {
            console.error("[App Context Error] getDoctorsData failed:", error);
            
            //  Extract semantic error strings safely from backend response structures
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Network error. Unable to load doctors list at this time.");
            }
        }
    };

        useEffect(() => {
       getDoctorsData();
    }, [])



    const value = {
     doctors, 
     currencySymbol,
      getDoctorsData,
      token, setToken,
      backendUrl
}



return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)

}

export default AppContextProvider