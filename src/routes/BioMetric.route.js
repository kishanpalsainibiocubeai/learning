import { Router } from "express";
import { addBioMetric, updateBioMetric,getAllBioMetricUsers,deleteBioMetric } from "../controllers/BioMetric.controllers.js";

const router = Router();

router.route("/add").post(addBioMetric);
router.route("/update").post(updateBioMetric);
router.route("/all-user-biometric").get(getAllBioMetricUsers);
router.route("/delete").post(deleteBioMetric);


export default router;
