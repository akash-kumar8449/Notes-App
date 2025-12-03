import React, { useState, useEffect, useRef } from 'react';

const Notes = ({title,date,onEdit,onDelete}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // Outside click to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full relative">
      <h2 className="text-gray-900 font-semibold text-lg">
        {title}
      </h2>

      

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-700">{date}</span>

        {/* Three Dots */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="text-gray-700 text-xl font-bold"
        >
          ⋮
        </button>
      </div>

      {/* Dropdown Menu */}
      {openMenu && (
        <div
          ref={menuRef}
          className="absolute right-2 bottom-[-7px] bg-white shadow-lg rounded-md p-2 w-28"
        >
          <button className="w-full text-left px-2 py-1 hover:bg-gray-100 text-gray-800"  onClick={onEdit}>
            Edit
          </button>
          <button className="w-full text-left px-2 py-1 hover:bg-gray-100 text-red-600" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Notes;
