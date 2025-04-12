import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ title: "GET all User" }));

userRouter.get("/:id", (req, res) => res.send({ title: "GET user details" }));

userRouter.post("/", (req, res) => res.send({ title: "CREATE a new User" }));

userRouter.put("/:id", (req, res) => res.send({ title: "Update a  User" }));

userRouter.delete("/:id", (req, res) => res.send({ title: "Delete a  User" }));

export default userRouter;
