import bcrypt from "bcrypt"
import { User } from "../models/models.js"
import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });


const postUser = async (req, res) => {

<<<<<<< HEAD
    const { username, email, isAdmin } = req.body,
        password = username

    if (!username || !email || !isAdmin) {
        res.json({ message: "Fill in all fields please :)" });
    } else {
        try {
            const existingUsername = await User.findOne({ username: username });
            const existingEmail = await User.findOne({ email: email });

            if (existingUsername) {
                res.json({ message: "This username is taken" });
            } else if (existingEmail) {
                res.json({ message: "This email address is taken :(" });
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, async function (err, hash) {
                        const newUser = new User({
                            username,
                            email,
                            isAdmin,
                            password: hash,
                        });

                        try {
                            await newUser.save();
                            res.json({ message: "success" });
                        } catch (error) {
                            console.log(error);
                            res.status(500).json({ message: "Internal Server Error" });
                        }
                    });
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
=======
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
>>>>>>> 501866e6d42646336f0f545eee53e6af2666aa6c
        }
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
    const data = req.body;
    console.log(data)
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
            .then(_ => res.json("success"))
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