// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../Firebase";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore"
// import { db } from "../Firebase"

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);

//       // ✅ LOGIN SUCCESS → REDIRECT
//       navigate("/");

//     } catch (error) {
//       console.error(error);
//       alert("Login failed");
//     }
//   };

//     console.log(db)
    
//     getDocs(collection(db,"task")).then(s =>
//     s.forEach(d => console.log(d.id, d.data()))
//   );

//   return (
//     <div style={{
//       height: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       flexDirection: "column"
//     }}>
//       <h2>Login</h2>
//       <button onClick={handleLogin}>
//         Sign in with Google
//       </button>
//     </div>
//   );
// };


// export default Login;
