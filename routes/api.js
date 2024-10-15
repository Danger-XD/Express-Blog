import express from "express";
const router = express.Router();

import * as blogController from "../controllers/blogController.js";

router.get("/login",blogController.logoutOperation);
router.post("/loginSubmit",blogController.loginSubmitOperation);
router.get("/home",blogController.homePage);
router.get("/blogs",blogController.blogPage)
router.get("/create-post",blogController.createPost)
router.post("/submit",blogController.submitOperation);
router.post("/update",blogController.updateOperation);
router.post("/delete",blogController.deleteOperation);
router.get("/about",blogController.aboutPage);

export default router;