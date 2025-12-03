import React, { useState } from 'react'
import { post } from '../../services/apiEndPoint.js'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();   

  const [value, setValue] = useState({
    email: '',
    password: ''
  })

  // popup states
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: ""
  })

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message })

    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" })
    }, 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const request = await post('/auth/login', value)
      const response = await request.data
      console.log("Login Response:", response)

      showPopup("success", "Login Successful!")

      //  Navigate to Home Page
      setTimeout(() => navigate('/'), 800)

    } catch (error) {
      console.log("Login Error:", error)

      let msg = "Something went wrong"
      if (error.response) {
        msg = error.response.data.message || msg
      }

      showPopup("error", msg)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 relative">

      {/* Popup Alert */}
      {popup.show && (
        <div
          className={`fixed top-5 right-5 px-4 py-3 rounded-md shadow-lg text-white transition-all duration-300
          ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}
          animate-pulse
          `}
        >
          {popup.message}
        </div>
      )}

      <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={value.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={value.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-all"
          >
            Login
          </button>
        </form>

        {/*  Register Link (Navigate) */}
        <p className="mt-4 text-center text-gray-700">
          Don’t have an account?
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Register
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login
