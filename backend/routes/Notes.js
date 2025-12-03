import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/Notes.js';
import VerificationToken from '../middlewares/VerificationToken.js';


const NotesRouter = express.Router();

NotesRouter.post('/create',VerificationToken,createNote); 
NotesRouter.put('/update/:id',VerificationToken,updateNote);
NotesRouter.delete('/delete/:id',VerificationToken,deleteNote);
NotesRouter.get('/get',VerificationToken,getNotes);


export default NotesRouter;