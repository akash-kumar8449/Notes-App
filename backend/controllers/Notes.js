import NotesModel from "../models/Notes.js";

const createNote = async(req, res) => {
    try {
        const userId = req.userId;
        console.log("User ID from token:", userId);

        const { title}= req.body;
        if(!title){
            return res.status(400).json({message: "Title is required"});
        }
            const newNote = new NotesModel({title, userId});
            await newNote.save();
            res.status(201).json({"success":true ,message: "Note created successfully", note: newNote});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const updateNote = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("User ID from token:", userId);

    const noteId = req.params.id;
    const { title } = req.body;

    console.log("Note ID to update:", noteId);

    // ❌ Ye line hatao (ye sabse bada issue tha)
    // res.send("Update Note");

    const findNote = await NotesModel.findById(noteId);
    console.log("Found Note:", findNote);

    if (!findNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (userId.toString() !== findNote.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You cannot update this note" });
    }

    const UpdatedNote = await NotesModel.findByIdAndUpdate(
      noteId,
      { title },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Note updated successfully", note: UpdatedNote });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.id;
    const findNote = await NotesModel.findById(noteId);

    if (!findNote) {
      return res.status(404).json({ message: "Note not found" });
    }               
    if (userId.toString() !== findNote.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You cannot delete this note" });
    }       
    const deleteNote= await NotesModel.findByIdAndDelete(noteId);
    return res.status(200).json({ message: "Note deleted successfully", note: deleteNote });
    } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
    }
};

const getNotes = async (req, res) => {
  try {
    const userId = req.userId;      
    const notes = await NotesModel.find({ userId });
    return res.status(200).json({ notes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  } 
};


export { createNote, updateNote, deleteNote, getNotes };