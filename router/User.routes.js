import exp from "express"
import { deleteUser, getUser, getUsers, postUser, updateUser } from "../controllers/user.controller.js"
const router = exp.Router()

router.route("/").get(getUsers).post(postUser)

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser)

export default router