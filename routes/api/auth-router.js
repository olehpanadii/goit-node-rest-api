import express from "express";
import authController from "../../conrtollers/auth-controller.js";
import {
  isEmptyBody,
  authenticate,
  upload,
  sizeAvatar,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

import { userSignupSchema, userEmailSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatarURL"),
  isEmptyBody,
  validateBody(userSignupSchema),
  sizeAvatar,
  authController.signup
);
authRouter.get(
  "/verify/:verificationToken",
  authController.verificationRequest
);
authRouter.post(
  "/verify",
  isEmptyBody,
  validateBody(userEmailSchema),
  authController.resendVerifyEmail
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signin
);
authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/avatars",
  upload.single("avatarURL"),
  // isEmptyBody,
  sizeAvatar,
  authenticate,
  authController.updateAvatar
);

export default authRouter;
