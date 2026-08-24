import { createContext } from "react";

// 1. Create the context
export const DoctorContext = createContext();

// 2. Create the provider component
const DoctorContextProvider = (props) => {
  // Add your global states and functions inside this object
  const value = {};

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
