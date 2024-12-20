import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddApointment from "./pages/AddApointment";
import AddDoctors from "./pages/AddDoctors";
import "./index.css";
import AdminHomepage from "./pages/AdminHomepage";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Thanky from "./pages/Thanky";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/addappointment" element={<AddApointment />} />
        <Route path="/addDoctor" element={< AddDoctors/>} />
        <Route path="/login" element={< Login/>} />
        <Route path="/" element={< Register/>} />
        <Route path="/thanky" element={< Thanky/>} />
       
        <Route path="/viewAppointment" element={<AdminHomepage />} />
      </Routes>
    </Router>
  );
}

export default App;
