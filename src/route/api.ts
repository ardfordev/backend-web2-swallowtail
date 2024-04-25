import { SubstationController } from "./../controller/substation-controller";
import { UserController } from "./../controller/user-controller";
import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User API
apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);

// Substation API
apiRouter.post("/api/substations", SubstationController.create);
apiRouter.get("/api/substations/:substationId(\\d+)", SubstationController.get);
apiRouter.put(
  "/api/substations/:substationId(\\d+)",
  SubstationController.update
);
apiRouter.delete(
  "/api/substations/:substationId(\\d+)",
  SubstationController.remove
);
apiRouter.get("/api/substations", SubstationController.search);
