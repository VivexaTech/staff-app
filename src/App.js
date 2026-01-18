import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import Attendance from './pages/Attendance';
import TasksPage from './pages/Task';
import SubmitTask from './pages/SubmitTask';
// import Login from './pages/Login';
// import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <>
      {/* <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute> } />
        <Route path="/Task" element={<ProtectedRoute><Tasks /></ProtectedRoute> } />
        <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute> } />
        <Route path="/Attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute> } />
        </Routes>
    </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/Task" element={<TasksPage />} />
          <Route path="/Task/SubmitTask" element={<SubmitTask />} />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Attendance" element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
