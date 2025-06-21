import { Router } from "express";
import { verifyJWT_email, verifyJWT_username } from "../middlewares/verifyJWT.middleware.js";
import { saveUser,uploadPic, } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//upload picture
router.route("/uploadPicture").post(verifyJWT_username, upload.fields([{ name: "picture", maxCount: 1 }]), uploadPic);
//save user
router.route("/saveUser").put(verifyJWT_username, saveUser);

export default router;
