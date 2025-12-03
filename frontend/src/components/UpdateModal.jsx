import React from 'react'

const UpdateModal = ({ isOpen, onClose,title, value, handelTitleChange, handelUpdateNote }) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-transeparent bg-opacity-10 flex items-center justify-center">
      
      <div className="bg-gray-600 w-96 rounded-lg shadow-lg p-6">
        <h2 className=" text-white text-xl font-semibold mb-4">Update Notes</h2>

        <input
          type="text"
          value={value}
          onChange={handelTitleChange}
          placeholder="Update your note..."
          className="text-white w-full border p-2 rounded mb-4"
        />

        

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
          onClick={handelUpdateNote}>
            Save
          </button>
        </div>
      </div>

    </div>
  )
}

export default UpdateModal