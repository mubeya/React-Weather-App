import './App.css';
import Weather from "./components/Weather";
import { CityProvider } from "./context/CityContext";

function App() {
  return (
   <CityProvider>
     <Weather />
   </CityProvider>
  );
}

export default App;
