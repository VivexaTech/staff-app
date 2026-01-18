// import { Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../Firebase";

// const ProtectedRoute = ({ children }) => {
//   const [user, setUser] = useState(undefined); // undefined = checking

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser); // null OR user
//     });
//     return () => unsub();
//   }, []);

//   // ⏳ Jab tak Firebase auth check ho rahi hai
//   if (user === undefined) {
//     return <p style={{ textAlign: "center" }}>Loading...</p>;
//   }

//   // ❌ Login nahi
//   if (!user) {
//     return <Navigate to="/Login" replace />;
//   }

//   // ✅ Login hai
//   return children;
// };

// export default ProtectedRoute;
