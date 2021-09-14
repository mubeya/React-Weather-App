import { createContext, useContext, useState } from "react";

const CityContext = createContext(); 

export const CityProvider = ({children}) => {
    const [city, setCity] = useState("Adana");
    const values = {city,setCity};

    return <CityContext.Provider value={values}>
        {children}
    </CityContext.Provider>
}

export const useCity = () => useContext(CityContext); //contexti kullanarak hook oluşturduk