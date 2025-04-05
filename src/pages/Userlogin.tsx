
//import { useState } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
//import { Navigate } from "react-router-dom";

function LoginForm({ isLogin, onSignupSuccess }) {
  
  const [user,setUser]=useState("");
  const [pass,setPass]=useState("");
  const [email,setEmail]=useState("");
  const [error,setError]=useState("");
  const [msg,setMsg]=useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);
  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
  //   }
  // }, [error]);

  const handleInputChange = (e, type) => {
    setError("");
    const value = e.target.value.trim();
    if (type === "user") setUser(value);
    if (type === "email") setEmail(value);
    if (type === "pass") setPass(value);
    if (value === "") {
      setError(
        `${type === "user" ? "Username" : type === "email" ? "Email" : "Password"} cannot be left blank`
      );
    }
   // if (value === "") setError(`${type === "user" ? "Username" : type === "email" ? "Email" : "Password"} cannot be left blank`);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if ((!isLogin && user === "") || email === "" || pass === "") {
    //   setError("All fields are required");
     // alert("Please fill in all fields");
     if (!isLogin && user === "") {
      setError("Username is required");
      return;
    }
    if (email === "") {
      setError("Email is required");
      return;
    }
    if (pass === "") {
      setError("Password is required");
      return;
    }

    try {
      const response = await fetch(
        isLogin
          ? "http://localhost/bike_waterwash_backend/user_login.php"
          : "http://localhost/bike_waterwash_backend/User_signup.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
         // body: JSON.stringify({ email, pass, user: isLogin ? undefined : user }),
          // body: formData,
          body: JSON.stringify(
            isLogin 
            ? { email, pass } 
            : { user, email, pass }
          ),
        }
      );
      //const result = await response.json();
    const result = await response.json().catch(() => {
      setError("Invalid response from the server");
      return null;
    });
    if (!result) return;
  
    console.log("Login response:", result);
      if (result.success) {
        setMsg(result.message);
        // setTimeout(() => {
        //   if (isLogin) {
        //     //console.log("Page navigate to dashboard");
        //   //  setIsLoading(true);
        //     navigate("/dashboard");
          
        //   //  navigate("/dashboard");
        //   } else {
        //     onSignupSuccess();
        //   }
        // }, 1000);
        navigate("/dashboard");
      } else {
        setError(result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Server error, please try again later");
      //alert("Server error, please try again later");
    }
  };




  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {msg && <p className="text-green-500">{msg}</p>}
      {!isLogin && (
        <input
          type="text"
          value={user}
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={(e) => handleInputChange(e, "user")}
        />
      )}
      <input
        type="email"
        value={email}
        placeholder="Email Address"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        onChange={(e) => handleInputChange(e, "email")}
      />
      <input
        type="password"
        value={pass}
        placeholder="Password"
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        onChange={(e) => handleInputChange(e, "pass")}
      />
      <button
        type="submit"
        className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </form>
  );
}

export default function UserLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    setIsLogin(true);
   // navigate("/dashboard");
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
        <div className="pt-16 flex-grow">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 py-8">
            <div className="w-full max-w-md p-8 bg-black rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-center text-white mb-6">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              <LoginForm isLogin={isLogin} onSignupSuccess={handleSignupSuccess} />
              <p className="mt-4 text-center text-white">
                {isLogin ? "Don't have an account?" : "Already have an account?"} 
                <button
                  className="text-blue-500 hover:underline ml-2"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

//   return (
    
//     <form className="space-y-4" action="" method="post">
//       <p>
//         {
//           error!=="" ?
//           <span className="error">{error}</span>:
//           <span className="success">{msg}</span>
//         }
//       </p>
//       {!isLogin && (
//         <input
//           type="text"
//           value={user}
//           placeholder="Full Name"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onChange={(e)=> handleInputChange(e,"user")}
//         />
//       )}
//       <input
//         type="email"
//         placeholder="Email Address"
//         value={email}
//         onChange={(e)=> handleInputChange(e,"email")}
//         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={pass}
//         onChange={(e)=> handleInputChange(e,"pass")}
//         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <button
//         onClick={() => navigate('/dashboard')}
//         type="submit"
//         className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//       >
//         {isLogin ? "Login" : "Sign Up"}
//       </button>
//     </form>
//   );
// }

// export default function UserLogin() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
    

//     <div className="min-h-screen flex flex-col ">
      
//     <Navbar />
//         <div className="flex items-center justify-center min-h-screen bg-cover bg-center">
     
//       <div className="pt-16 flex-grow ">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-16 py-8 ">
      
//       <div className="w-full max-w-md p-8 bg-black rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-white -700 mb-6">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>
//         <LoginForm isLogin={isLogin} />
//         <p className="mt-4 text-center text-white -600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"} 
//           <button
//             className="text-blue-500 hover:underline ml-2"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
      
//     </div>
//     </div>
//     </div>
//     <Footer />
// </div>
    
//   );
// }



// import { useState } from "react";

// function LoginForm({ isLogin }) {
//   return (
//     <form className="space-y-4">
//       {!isLogin && (
//         <input
//           type="text"
//           placeholder="Full Name"
//           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       )}
//       <input
//         type="email"
//         placeholder="Email Address"
//         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       <button
//         type="submit"
//         className="w-full p-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//       >
//         {isLogin ? "Login" : "Sign Up"}
//       </button>
//     </form>
//   );
// }

// export default function UserLogin() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900/?technology')" }}
//     >
//       <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-2xl shadow-lg backdrop-blur-md">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>
//         <LoginForm isLogin={isLogin} />
//         <p className="mt-4 text-center text-gray-600">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button
//             className="text-blue-500 hover:underline ml-2"
//             onClick={() => setIsLogin(!isLogin)}
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
