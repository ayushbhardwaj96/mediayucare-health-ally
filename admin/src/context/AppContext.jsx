import { createContext } from "react";

export const AppContext = createContext()


const AppContextProvider = (props) =>{

const currency = import.meta.env.VITE_CURRENCY || '$';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Converts a date string like "20_01_2000" into a readable format like "20 Jan 2000"
const slotDateFormat = (slotDate) => {
    if (!slotDate || typeof slotDate !== 'string' || !slotDate.includes('_')) {
        return "N/A";
    }

    const [day, month, year] = slotDate.split('_');
    const monthIndex = parseInt(month, 10) - 1;  

    if (monthIndex < 0 || monthIndex > 11) {
        return `${day} Unknown ${year}`;
    }

    return `${day} ${months[monthIndex]} ${year}`;
};

// Calculates the exact age by checking if the birthday has already passed this year
const calculateAge = (dob) => {
    if (!dob) return 'N/A';

    let birthDate;

    // Convert custom underscore string format (DD_MM_YYYY) to a valid computer date object
    if (typeof dob === 'string' && dob.includes('_')) {
        const [day, month, year] = dob.split('_');
        birthDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    } else {
        birthDate = new Date(dob);
    }
 
    if (isNaN(birthDate.getTime())) {
        return 'N/A';
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
 
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 0 ? age : 0;
};

const value = {
    backendUrl,
    currency,
    slotDateFormat,
    calculateAge,
};


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider