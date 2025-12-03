import mongoose from "mongoose";


const noteScema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    userId: {
        "type":"String"
    },
},{
    timestamps: true
})

const NoteModel = mongoose.model("Notes", noteScema);
export default NoteModel;