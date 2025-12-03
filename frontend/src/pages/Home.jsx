import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Notes from '../components/Notes';
import NotesModal from '../components/NotesModal';
import UpdateModal from '../components/UpdateModal';
import { del, get, post, put } from '../../services/apiEndPoint.js';

const Home = () => {

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);    // Edit Modal
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");

  const [editTitle, setEditTitle] = useState("");                   // Edit title
  const [editId, setEditId] = useState("");                         // Edit ID


  // ==============================================
  //  GLOBAL getNotes function so we can call it anywhere
  // ==============================================
  const getNotes = async () => {
    try {
      const request = await get('/notes/get');
      const response = request.data;
      setNotes(response.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };


  // Fetch notes on first load
  useEffect(() => {
    getNotes();
  }, []);


  // ==============================================
  // Create Note
  // ==============================================
  const handelCreateNote = async () => {
    try {
      const request = await post('/notes/create', { title });
      setTitle("");
      setOpenModal(false);
      getNotes();             // 🔥 Refresh
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };


  // ==============================================
  //  EDIT Button click
  // ==============================================
  const handleEdit = (note) => {
    setEditTitle(note.title);   // modal me show hoga
    setEditId(note._id);        // update ke liye id store
    setOpenUpdateModal(true);   // Modal Open
  };


  // ==============================================
  // UPDATE NOTE
  // ==============================================
  const handelUpdateNote = async () => {
    try {
      await put(`/notes/update/${editId}`, { title: editTitle });

      setOpenUpdateModal(false);
      setEditTitle("");

      getNotes();                //  Refresh Notes
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // ===================================================
  //  DELETE NOTE
  // ===================================================
  const handleDelete = async (id) => {
    try {
      await del(`/notes/delete/${id}`);
      getNotes();   // Refresh after delete
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  


  // ==============================================
  // JSX RETURN
  // ==============================================
  return (
    <div className="w-full min-h-screen flex">

      {/* Sidebar */}
      <div className="w-1/6 bg-gray-100 p-4">
        <Sidebar onAdd={() => setOpenModal(true)} />
      </div>

      {/* Main Content */}
      <div className="w-5/6 p-6">
        <Navbar />

        <h1 className="text-2xl font-bold mt-6">Notes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {notes.map((ele) => (
            <Notes
              key={ele._id}
              title={ele.title}
              date={ele.createdAt}
              onEdit={() => handleEdit(ele)}   //  FIX → Now modal opens
              onDelete={() => handleDelete(ele._id)} // DELETE WORKING
              
            />
          ))}
        </div>

      </div>

      {/* Create Note Modal */}
      <NotesModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        value={title}
        handelTitleChange={(e) => setTitle(e.target.value)}
        handelCreateNote={handelCreateNote}
      />

      {/* Update Note Modal */}
      <UpdateModal
        isOpen={openUpdateModal}                         // FIX
        onClose={() => setOpenUpdateModal(false)}
        value={editTitle}
        handelTitleChange={(e) => setEditTitle(e.target.value)}
        handelUpdateNote={handelUpdateNote}
      />

    </div>
  );
};

export default Home;
