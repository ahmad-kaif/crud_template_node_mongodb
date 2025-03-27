import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/userSchema.js";


const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//Create
app.post('/create', async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }
        const newUser = await User.create({ username, email });
        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error while creating user" });
    }
});
//Read
app.get('/read', async (req,res)=>{
    const existingUsers = await User.find();
    if(existingUsers.length === 0){
        return res.status(404).json({error: "No user found"});
    }
    return res.status(200).json(existingUsers);
    
})
//update - put
app.put('/updatePut/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(422).json({ error: "Please fill all the fields" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: "Server error while updating user" });
    }
});
// update - patch
app.patch('/updatePatch/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Get the fields to update

        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No updates provided" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: "Server error while updating user" });
    }
});


//Delete
app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Server error while deleting user" });
    }
});


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected!!!")
    } catch (error) {
        console.log(`Error connection to db`, error);
        process.exit(1);
    }
}

app.listen(process.env.PORT, () => {
    connectDB();
    console.log("Server is running on port 3000");
})