import { Router } from "express";

const subcriptionRouter = Router();

subcriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all Subcription" })
);

subcriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET Subcription details" })
);

subcriptionRouter.post("/", (req, res) =>
  res.send({ title: "Create Subcription" })
);

subcriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update Subcription" })
);

subcriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete Subcription" })
);

subcriptionRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all users Subcription" })
);

subcriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "Cancel Subcription" })
);

subcriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get All Upcoming Subcription" })
);

export default subcriptionRouter;
