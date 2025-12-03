import UserModel from "../models/Auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password){
            return  res.status(400).json({message: "All fields are required"});
        }
        const exitingUser = await UserModel.findOne({email});
        if(exitingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hassepassword = await bcrypt.hashSync(password, 10);
        
        const newUser = new UserModel({username, email, password: hassepassword});
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});   
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }   
        const findUser = await UserModel.findOne({email});
        if(!findUser){
            return res.status(400).json({message: "Invalid credentials"});
        }       
        const isPasswordCorrect = await bcrypt.compareSync(password, findUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }  
        
        const token =await jwt.sign({userId: findUser._id},process.env.secretKey,{expiresIn: '3d'});

         // 🔥 COOKIE SET KARO
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,       // localhost = false
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        
        res.status(200).json({message: "Login successful", user:findUser,});  
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({message: "Logout successful"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export { Register, Login , Logout   };