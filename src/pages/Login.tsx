// // Login.tsx

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Droplet, LogIn } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// //import Userlogin from "../pages/Userlogin";


// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showAdminLogin, setShowAdminLogin] = useState(false);
//   const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" });


//   const handleGoogleLoginSuccess = (response: any) => {
//     setIsLoading(true);
//     const decoded: any = jwtDecode(response.credential);
//     const userData = {
//       id: decoded.sub,
//       name: decoded.name,
//       email: decoded.email,
//       isAdmin: false, 
//     };
//     login(userData);
//     setIsLoading(false);
//     navigate("/dashboard");
//   };

//   const handleGoogleLoginFailure = () => {
//     alert("Google Login Failed. Please try again.");
//   };
//   const handleAdminLogin = () => {
//     if (adminCredentials.email === "admin@example.com" && adminCredentials.password === "admin123") {
//       const adminUser = {
//         id: "admin",
//         name: "Administrator",
//         email: adminCredentials.email,
//         isAdmin: true,
//       };
//       login(adminUser);
//       navigate("/admin-dashboard");
//     } else {
//       alert("Invalid admin credentials");
//     }
//   };


//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div className="text-center">
//             <div className="flex justify-center">
//               <Droplet className="h-12 w-12 text-blue-500" />
//             </div>
//             <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Or{' '}
//               <button onClick={() => navigate('/')} className="font-medium text-blue-600 hover:text-blue-500">
//                 continue as guest
//               </button>
//             </p>
//           </div>
//           <div className="mt-8 space-y-6">
//             <GoogleLogin
//               onSuccess={handleGoogleLoginSuccess}
//               onError={handleGoogleLoginFailure}
//             />
//           </div>

//            {/* Admin Login Toggle Button */}
//            {!showAdminLogin ? (
//             <button
//               onClick={() => setShowAdminLogin(true)}
//               className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-4 rounded-md flex items-center justify-center"
//             >
//               <LogIn className="mr-2" /> Sign in as Admin
//             </button>
//           ) : (
//             <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-gray-700">Admin Login</h3>
//                 <button onClick={() => setShowAdminLogin(false)} className="text-gray-500 hover:text-gray-700">
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               <input
//                 type="email"
//                 placeholder="Admin Email"
//                 value={adminCredentials.email}
//                 onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
//                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//               />
//               <input
//                 type="password"
//                 placeholder="Admin Password"
//                 value={adminCredentials.password}
//                 onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
//                 className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
//               />
//               <button
//                 onClick={handleAdminLogin}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-md flex items-center justify-center"
//               >
//                 <LogIn className="mr-2" /> Login as Admin
//               </button>
//             </div>
//           )}



        
          
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplet, LogIn, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" });

  const handleGoogleLoginSuccess = (response: any) => {
    setIsLoading(true);
    const decoded: any = jwtDecode(response.credential);
    const userData = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      isAdmin: false,
    };
    login(userData);
    setIsLoading(false);
    navigate("/dashboard");
  };

  const handleGoogleLoginFailure = () => {
    alert("Google Login Failed. Please try again.");
  };

  const handleAdminLogin = () => {
    if (adminCredentials.email === "admin@example.com" && adminCredentials.password === "admin123") {
      const adminUser = {
        id: "admin",
        name: "Administrator",
        email: adminCredentials.email,
        isAdmin: true,
      };
      login(adminUser);
      navigate("/admin-dashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Droplet className="h-12 w-12 text-blue-500" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <button onClick={() => navigate("/")} className="font-medium text-blue-600 hover:text-blue-500">
                continue as guest
              </button>
            </p>
          </div>

          {/* Google Login */}
          <div className="mt-8 space-y-6">
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginFailure} />
          </div>

          {/* Admin Login Toggle Button */}
          {!showAdminLogin ? (
            <button
              onClick={() => setShowAdminLogin(true)}
              className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-4 rounded-md flex items-center justify-center"
            >
              <LogIn className="mr-2" /> Sign in as Admin
            </button>
          ) : (
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Admin Login</h3>
                <button onClick={() => setShowAdminLogin(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <input
                type="email"
                placeholder="Admin Email"
                value={adminCredentials.email}
                onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              />
              <input
                type="password"
                placeholder="Admin Password"
                value={adminCredentials.password}
                onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleAdminLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-md flex items-center justify-center"
              >
                <LogIn className="mr-2" /> Login as Admin
              </button>
            </div>
          )}

<div className="mt-6 flex justify-center">
<button
  onClick={() => navigate('/Userlogin')}
  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100"
>
  <LogIn className="h-5 w-5 mr-2" /> User Login
</button>
</div>


        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;







