import { Router } from "express";
import {
  createTrafficEntry,
  getCountryTraffic,
  getVehicleTypeTraffic,
  updateTrafficEntry,
  deleteTrafficEntry,
  getAllTrafficEntries,
  getTrafficEntryById,
} from "../controllers/traffic.controller";

const router = Router();

router.get("/countries", getCountryTraffic);
router.get("/vehicle-types", getVehicleTypeTraffic);

router.get("/", getAllTrafficEntries);
router.post("/", createTrafficEntry);
router.patch("/:id", updateTrafficEntry);
router.delete("/:id", deleteTrafficEntry);

export default router;
