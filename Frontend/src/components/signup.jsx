import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';  // Add useState here
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Set expiration
    document.cookie =` ${name}=${value};expires=${expires.toUTCString()};path=/;`;
  };

  // State to store form data
  const [formData, setFormData] = useState({
    username: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Retrieve role from sessionStorage
    const role = localStorage.getItem("role");

    if (!role) {
      alert("Role is missing. Please go back and select your role.");
      navigate("/roleselection");
      return;
    }

      // Log form data (for debugging or API submission)
      console.log( formData.username , localStorage.getItem("walletAddress"));

      // Posting the data to Database
      if(role==="student"){
        try {
          const response = await axios.post("https://edusphere-77qx.onrender.com/user/add-details", {
            username: formData.username,
            wallet_id: localStorage.getItem("walletAddress"),
          }, {
            headers: {
              "Content-Type": "application/json",
            }
          });
        
          if (response.status === 200) {
            alert(response.data.message);
            console.log(response.data.message);
            setCookie("user", response.data.token, 1);
            localStorage.setItem("user", response.data.data.id);
          } else {
            alert(response.data.error);
          }
          
          console.log(response);
        } catch (error) {
          alert(error.response ? error.response.data.error : error.message);
        }
      }else{
        try {
          const response = await axios.post(
            "https://edusphere-77qx.onrender.com/admin/add-details",
            {
              username: formData.username,
              wallet_id: localStorage.getItem("walletAddress"),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
          if (response.status === 200) {
            alert(response.data.message);
            const rdata = response.data;
            console.log(rdata.message);
            setCookie("admin", rdata.token, 1);
            localStorage.setItem("admin", rdata.data.id);
          } else {
            alert(response.data.error);
          }

          console.log(response);
        } catch (error) {
          console.error("Error:", error);
          alert(error.response?.data?.error || "Something went wrong");
        }
      }

    // Navigate to the respective home page based on the selected role
    const route = role === "educator" ? "/educatorhome" : "/studenthome";
    navigate(route);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white overflow-hidden">
      <header className="absolute top-5 right-20 text-2xl font-bold text-orange-400 text-shadow-xl">
        <img src="/images/Edusphere logo.png" alt="Edusphere Logo" className="inline-block w-10 h-10 mr-3" />
        Edusphere
      </header>
      <div className="flex w-4/5 h-4/5 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg overflow-hidden animate-scale-in">
        <div className="w-1/2 flex justify-center items-center bg-black bg-opacity-80 animate-slide-in-left">
          <img src="/images/sign up image.avif" alt="Futuristic Image" className="w-full h-full object-cover rounded-l-xl animate-zoom-in" />
        </div>
        <div className="w-1/2 p-10 flex flex-col justify-center bg-black bg-opacity-80 animate-slide-in-right">
          <form onSubmit={handleSignup} className="space-y-5 animate-fade-in-up">
            <label htmlFor="username" className="block text-gray-400 text-sm">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" className="w-full p-3 bg-gray-700 text-white rounded-md" required />

            {/* <label htmlFor="gender" className="block text-gray-400 text-sm">Gender</label>
            <select id="gender" className="w-full p-3 bg-gray-700 text-white rounded-md" required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="dob" className="block text-gray-400 text-sm">Date of Birth</label>
            <input type="date" id="dob" className="w-full p-3 bg-gray-700 text-white rounded-md" required />

            <label htmlFor="password" className="block text-gray-400 text-sm">Password</label>
            <input type="password" id="password" placeholder="Enter your password" className="w-full p-3 bg-gray-700 text-white rounded-md" required /> */}

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-400 text-white rounded-md text-lg">Add Details</button>

            {/* <div className="mt-5 text-center text-sm text-gray-300">
              Already have an account? 
              <span
                className="text-cyan-500 cursor-pointer"
                onClick={() => navigate('/userlogin')}
              >
                Login here
              </span>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;