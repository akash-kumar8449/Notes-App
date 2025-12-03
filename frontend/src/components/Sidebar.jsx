import React from 'react'
import { FaPlus } from "react-icons/fa";

const Sidebar = ({ onAdd }) => {
  return (
    <div className='flex flex-col  space-x-4 '>
      <h1 className='m-5 p-2 text-2xl font-bold '>Logo</h1>
      <div className='m-2 p-2  border-b-2 border-gray-300 '>
        < FaPlus onClick={onAdd} ></FaPlus>
      </div>
    </div>

  )
}

export default Sidebar