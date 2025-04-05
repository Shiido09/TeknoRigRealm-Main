import express from "express";
import multer from "multer";
import { registerUser, loginUser, getUserById, updateUser, getUserProfile, logoutUser, getAllUsers, googleLogin } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"; // Assuming you have this middleware

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Temporary storage for file uploads

router.get('/getAllUsers', getAllUsers);
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser); // Add logout endpoint
router.get("/profile", protect, getUserProfile); // New profile endpoint
router.get("/:id", getUserById);
router.put("/:id", upload.single("avatar"), updateUser);
router.post("/google-login", googleLogin); // Google login endpoint

export default router;
