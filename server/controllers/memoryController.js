const Memory = require('../models/memoryModel');
const cloudinary = require('cloudinary').v2;

const createMemory = async (req, res) => {
    try{
        console.log(req.files);
        console.log(req.body);
        const {title, summary, location, people} = req.body;
        const userId = req.user._id;

        // if no files uploaded, req.files may be undefined
        const filesArray = req.files || [];
 
       // upload each file to cloudinary
        const imageUrls = await Promise.all(
            filesArray.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'image',
                });
                return result.secure_url;
            })
        );

        const memoryData = {
            userId, title, summary, images: imageUrls, people, location
        }

        console.log(memoryData);

        const memory = new Memory(memoryData);
        await memory.save();

        res.status(201).json({msg: "Memories added successfully", data: memory});
    }

    catch(error){
        console.log("Creating memory server error", error)
        res.status(500).json({msg: "Creating memory server error"});
    }
}

const getAllMemories = async (req, res) => {
    try{
        const allMemories = await Memory.find({userId: req.user._id});
        // if(!allMemories || allMemories.length === 0) return res.status(404).json({msg: "No memories found"});
        res.status(200).json({data: allMemories || []});
    }
    catch(error){
        console.log("All memories server error! ", error);
        res.status(500).json({msg: "All memories server error!"});
    }
}

const getMemoryById = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) return res.status(404).json({msg: "Invalid memory Id"});

        const memory = await Memory.findById(id);

        if (!memory) return res.status(404).json({ msg: 'No memory found' });
        
        res.status(200).json({data: memory});
    }
    catch(error) {
        console.log("Get Memory by id server error! ", error);
        res.status(500).json({msg: "Get Memory by id server error!"});
    }
}

const updateMemory = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) return res.status(404).json({msg: "Invalid memory id"});
        const {title, summary, people, location} = req.body;
        const updateMemory = await Memory.findByIdAndUpdate(id, {title, summary, people, location});
        res.status(201).json({msg: `Memory updated successfully! ${updateMemory}`});
    }
    catch(error) {
        console.log("Update memory server error ", error);
        res.status(500).json({msg: "Update memory server error"});
    }
}

const deleteMemory = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id) return res.status(404).json({msg: "Invalid memory id"});
        await Memory.findByIdAndDelete(id);
        res.status(200).json({msg: "Memory delted successfully"});
    }
    catch(error){
        console.log("Delete memory server error! ", error);
        res.status(500).json({msg: "Delete memory error"});
    }
}

module.exports = { createMemory, getAllMemories, getMemoryById, updateMemory, deleteMemory};