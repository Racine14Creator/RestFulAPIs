import bcrypt from "bcrypt"
import { User } from "../models/models.js"

const postUser = async (req, res) => {
    try {
        const { username, email, profile, password } = req.body
        let isAdmin = false,
            isActive = true;

        const newUser = new User({
            username, email, isActive, isAdmin, password, profile
        })
        console.log(req.body)
        if (username === '') {
            res.json({message: "Fill in all fields"})
        } else {
            await User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        res.json({ error: "This email is taken" })
                    } else {
                        
                        // Crypt the password
                        bcrypt.genSalt(10, function(err, salt){
                            if(err) throw err
                            bcrypt.hash(newUser.password, salt, function(err, hash){
                                if(err) throw err
                                newUser.password = hash
                                newUser.save()
                                .then(user => {
                                    // console.log("User created " + user);
                                    res.json(user)
                                })
                                .catch(error => console.log("Failed to register user " + error))
                            })
                        })
                    }
                })
                .catch(error => console.log("Error Email " + error))
        }
    } catch (error) {
        let message = "Failed to register user..."
        console.log(message);
        res.json(message);
    }
}

const getUsers = async (req, res) => {
    try {
        await User.find()
            .then(users => res.json(users))
            .catch(error => console.log("Failed to fetch Users... " + error))
    } catch (error) {
        let message = "Failed to fetch users..."
        console.log(message)
        res.json(message)
    }
}

/**
 * To get one User
 * @param {/:id} req 
 * @param {/:id} res.json(user) 
 */

const getUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

/**
 * Update user
 * @param {/:id} req.params.id 
 * @param {/:id} res.json(user)
 */
const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const data = req.body;
        await User.findByIdAndUpdate(id, data)
            .then(user => { res.json("success").status(201) })
            .catch(error => console.log(error))
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
            .then(user => res.json(user))
            .catch(error => {
                console.log(error)
                res.json(error)
            })
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

export {
    postUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}