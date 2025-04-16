import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscriptions.controller.js";

const subcriptionRouter = Router();

subcriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all Subcription" })
);

subcriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET Subcription details" })
);

subcriptionRouter.post("/", authorize, createSubscription);

subcriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update Subcription" })
);

subcriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete Subcription" })
);

subcriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subcriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "Cancel Subcription" })
);

subcriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get All Upcoming Subcription" })
);

export default subcriptionRouter;
