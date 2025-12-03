import React from 'react'
import { useNavigate } from 'react-router-dom';
import { post } from '../../services/apiEndPoint';



const Navbar = () => {

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await post('/auth/logout');   // Backend logout call
      console.log("Logout Success:", response.data);

      // Local storage clear (optional but recommended)
      localStorage.removeItem("token");

      // Redirect to Login page
      navigate("/Login");

    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  return (
     <nav className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between">
      
      {/* Search Box */}
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Search..."
        //   value={searchValue}
        //   onChange={onSearchChange}
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className='gap-4 flex'>
        {/* Logout Button */}
      <button
        onClick={() => navigate("/Register")}
        className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all"
      >
        SinUp
      </button>
      <button
        className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-all"
        onClick={handleLogOut}
      >
        Logout
      </button>
      </div>
    </nav>
  )
}

export default Navbar