import { Request, Response } from "express";
import {
  getCountryTrafficService,
  getVehicleTypeTrafficService,
  getAllTrafficEntriesService,
  getTrafficEntryByIdService,
  createTrafficEntriesService,
  updateTrafficEntryService,
  deleteTrafficEntryService,
} from "../services/traffic.service";

export const getCountryTraffic = async (_req: Request, res: Response) => {
  const data = await getCountryTrafficService();
  res.json({ data });
};

export const getVehicleTypeTraffic = async (_req: Request, res: Response) => {
  const data = await getVehicleTypeTrafficService();
  res.json({ data });
};

export const getAllTrafficEntries = async (_req: Request, res: Response) => {
  try {
    const allEntries = await getAllTrafficEntriesService();
    res.json(allEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch traffic entries" });
  }
};

export const getTrafficEntryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const entry = await getTrafficEntryByIdService(parseInt(id));

    if (!entry) {
      return res.status(404).json({ error: "Traffic entry not found" });
    }

    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch traffic entry" });
  }
};

export const createTrafficEntry = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const entries = Array.isArray(body) ? body : [body];
    const created = await createTrafficEntriesService(entries);

    res.status(201).json({
      message: `${created.count} traffic entries created`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create traffic entries" });
  }
};

export const updateTrafficEntry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { country, vehicleType, count } = req.body;

  try {
    const updated = await updateTrafficEntryService(parseInt(id), {
      country,
      vehicleType,
      count: count !== undefined ? parseInt(count) : undefined,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Traffic entry not found" });
  }
};

export const deleteTrafficEntry = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteTrafficEntryService(parseInt(id));
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Traffic entry not found" });
  }
};
