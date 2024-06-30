import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected aliasing
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import { Home } from "./components/Home/Home";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import Insights from "./components/Insights/Insights";
import Servicesa from "./components/Services/Servicesa";
import Servicesb from "./components/Services/Servicesb";
import NotFound from "./components/NotFound/NotFound";

function App() { 
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/signin' element={<Signin/>}/>
        <Route exact path='/services/servicea' element={<Servicesa/>}/>
        <Route exact path='/services/serviceb' element={<Servicesb/>}/>
        <Route exact path='/aboutus' element={<AboutUs/>}/>
        <Route exact path='/insights' element={<Insights/>}/>
        <Route exact path='/contactus' element={<ContactUs/>}/>
        <Route path="*" element={<NotFound/>}/>


      </Routes>
    </Router>
        
  );
}

export default App;
