import express from "express";
const router = express.Router();

import * as blogController from "../controllers/blogController.js";

router.get("/",blogController.homePage);
router.post("/submit",blogController.submitOperation);
router.get("/about",blogController.aboutPage);
router.post("/update",blogController.updateOperation);
router.delete("/delete",blogController.deleteOperation);

export default router;