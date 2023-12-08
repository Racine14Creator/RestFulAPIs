const getUsers = async (req, res) => {
    res.json({ data: "Get All users" })
}
const getUser = async (req, res) => {
    res.json({ data: "Get user" })
}
const postUser = async (req, res) => {
    res.json({ data: "Post user" })
}
const updateUser = async (req, res) => {
    res.json({ data: "Update users" })
}
const deleteUser = async (req, res) => {
    res.json({ data: "Delete user" })
}

export {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser
}