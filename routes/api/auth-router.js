import express from "express";
import authController from "../../conrtollers/auth-controller.js";
import {
  isEmptyBody,
  isValideId,
  isEmptyBodyFav,
  authenticate,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

import { userSignupSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signin
);
authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);
export default authRouter;
