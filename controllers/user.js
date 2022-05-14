import User from "../model/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || 'nandy@123'
export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.json({ message: "Please register first :)" })
        const isPasscheck = await bcrypt.compare(password, existingUser.password);
        if (!isPasscheck) return res.json({ message: "Incorrect Password!" })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "1h" })
        res.status(200).json({ result: existingUser, token })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}

export const signUp = async (req, res) => {
    const { email, password, confirmpass } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.json({ message: "Email already exists! Please login :)" })
        if (password !== confirmpass) return res.json({ message: "Passwords doesn't match!" })
        const hashedPass = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPass })
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET, { expiresIn: "1h" })
        res.status(201).json({ result, token })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1 })
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}