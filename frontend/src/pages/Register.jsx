import React, { useState } from 'react'
import { post } from '../../services/apiEndPoint.js'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [value, setValue] = useState({
    username: '',
    email: '',
    password: ''
  })

  // Popup state
  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: '' // success / error
  })

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const request = await post('/auth/register', value)
      const response = request.data

      // Show success popup
      setPopup({
        show: true,
        message: response.message || "Registration Successful!",
        type: "success"
      })

      console.log("response", response)

      //  Auto Navigate to Login after 2 seconds
      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (error) {
      console.log("error", error)

      setPopup({
        show: true,
        message: error?.response?.data?.message || "Something went wrong!",
        type: "error"
      })

      setTimeout(() => {
        setPopup({ show: false, message: "", type: "" })
      }, 2000)
    }
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100 p-4">

      {/* Popup Box */}
      {popup.show && (
        <div
          className={`fixed top-6 right-6 px-6 py-4 rounded-md shadow-lg text-white font-semibold 
          ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}
        `}>
          {popup.message}
        </div>
      )}

      <div className="bg-white shadow-xl p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={value.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-md outline-none"
          />

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
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all"
          >
            Register
          </button>
        </form>

        {/*  Already have an account? Login */}
        <p className="mt-4 text-center text-gray-700">
          Already have an account?
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  )
}

export default Register
