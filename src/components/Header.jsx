import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div className="bottom-nav">
            <div className="container">
                <div className="row text-center">
                    
                    <div className="col">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <i className="bi bi-house-door"></i>
                            Home
                        </NavLink>
                    </div>

                    <div className="col">
                        <NavLink 
                            to="/Task" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <i className="bi bi-check2-square"></i>
                            Task
                        </NavLink>
                    </div>

                    <div className="col">
                        <NavLink 
                            to="/Attendance" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <i className="bi bi-journal-check"></i>
                            Attendance
                        </NavLink>
                    </div>

                    <div className="col">
                        <NavLink 
                            to="/Profile" 
                            className={({ isActive }) => isActive ? "active" : ""}
                        >
                            <i className="bi bi-person"></i>
                            Profile
                        </NavLink>
                    </div>

                </div>
            </div>
        </div>
    );
}
 