// import { useState } from "react";
// import { auth, googleProvider } from "../Firebase";
// import { signInWithPopup } from "firebase/auth";

// export default function Login() {
//     const [userId, setuserId] = useState(null);

//     const handleGoogleLogin = async () => {
//         try {
//             const result = await signInWithPopup(auth, googleProvider);
//             const email = result.user.email;

//             setuserId(email);
//             console.log(email);
//             alert("Success");
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     return (
//         <>
//             <button onClick={handleGoogleLogin}>
//                 Login with Google
//             </button>

//             {userId && <p>Logged in as: {userId}</p>}
//         </>
//     );
// }
// // export  const userId = useEmail();