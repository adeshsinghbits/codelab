import { Router } from "express"
import {
    getAllCourses,
    createCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse
} from "../controllers/course.controller.js";
import { verifyJWT_username } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/:courseId", getSingleCourse);
router.post("/", verifyJWT_username, createCourse);
router.put("/:courseId", verifyJWT_username, updateCourse);
router.delete("/:courseId", verifyJWT_username, deleteCourse);

export default router;
