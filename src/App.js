import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Task from './pages/Task';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Task" element={<Task />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Attendance" element={<Attendance />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
