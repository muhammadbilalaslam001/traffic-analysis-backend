"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrafficEntry = exports.updateTrafficEntry = exports.createTrafficEntry = exports.getTrafficEntryById = exports.getAllTrafficEntries = exports.getVehicleTypeTraffic = exports.getCountryTraffic = void 0;
const traffic_service_1 = require("../services/traffic.service");
const getCountryTraffic = async (_req, res) => {
    const data = await (0, traffic_service_1.getCountryTrafficService)();
    res.json({ data });
};
exports.getCountryTraffic = getCountryTraffic;
const getVehicleTypeTraffic = async (_req, res) => {
    const data = await (0, traffic_service_1.getVehicleTypeTrafficService)();
    res.json({ data });
};
exports.getVehicleTypeTraffic = getVehicleTypeTraffic;
const getAllTrafficEntries = async (_req, res) => {
    try {
        const allEntries = await (0, traffic_service_1.getAllTrafficEntriesService)();
        res.json(allEntries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch traffic entries" });
    }
};
exports.getAllTrafficEntries = getAllTrafficEntries;
const getTrafficEntryById = async (req, res) => {
    const { id } = req.params;
    try {
        const entry = await (0, traffic_service_1.getTrafficEntryByIdService)(parseInt(id));
        if (!entry) {
            return res.status(404).json({ error: "Traffic entry not found" });
        }
        res.json(entry);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch traffic entry" });
    }
};
exports.getTrafficEntryById = getTrafficEntryById;
const createTrafficEntry = async (req, res) => {
    try {
        const body = req.body;
        const entries = Array.isArray(body) ? body : [body];
        const created = await (0, traffic_service_1.createTrafficEntriesService)(entries);
        res.status(201).json({
            message: `${created.count} traffic entries created`,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create traffic entries" });
    }
};
exports.createTrafficEntry = createTrafficEntry;
const updateTrafficEntry = async (req, res) => {
    const { id } = req.params;
    const { country, vehicleType, count } = req.body;
    try {
        const updated = await (0, traffic_service_1.updateTrafficEntryService)(parseInt(id), {
            country,
            vehicleType,
            count: count !== undefined ? parseInt(count) : undefined,
        });
        res.json(updated);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "Traffic entry not found" });
    }
};
exports.updateTrafficEntry = updateTrafficEntry;
const deleteTrafficEntry = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, traffic_service_1.deleteTrafficEntryService)(parseInt(id));
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "Traffic entry not found" });
    }
};
exports.deleteTrafficEntry = deleteTrafficEntry;
