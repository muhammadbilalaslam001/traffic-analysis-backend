"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrafficEntry = exports.updateTrafficEntry = exports.createTrafficEntry = exports.getTrafficEntryById = exports.getAllTrafficEntries = exports.getVehicleTypeTraffic = exports.getCountryTraffic = void 0;
const db_1 = __importDefault(require("../db"));
const getCountryTraffic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.traffic.groupBy({
        by: ["country"],
        _sum: { count: true },
    });
    const countryTraffic = result.map((item) => ({
        country: item.country,
        count: item._sum.count || 0,
    }));
    res.json({ data: countryTraffic });
});
exports.getCountryTraffic = getCountryTraffic;
const getVehicleTypeTraffic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.traffic.groupBy({
        by: ["vehicleType"],
        _sum: { count: true },
    });
    const vehicleTypeTraffic = result.map((item) => ({
        vehicleType: item.vehicleType,
        count: item._sum.count || 0,
    }));
    res.json({ data: vehicleTypeTraffic });
});
exports.getVehicleTypeTraffic = getVehicleTypeTraffic;
const getAllTrafficEntries = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEntries = yield db_1.default.traffic.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(allEntries);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch traffic entries" });
    }
});
exports.getAllTrafficEntries = getAllTrafficEntries;
const getTrafficEntryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const entry = yield db_1.default.traffic.findUnique({
            where: { id: parseInt(id) },
        });
        if (!entry) {
            res.status(404).json({ error: "Traffic entry not found" });
            return;
        }
        res.json(entry);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch traffic entry" });
    }
});
exports.getTrafficEntryById = getTrafficEntryById;
const createTrafficEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const entries = Array.isArray(body) ? body : [body];
        const created = yield db_1.default.traffic.createMany({
            data: entries.map((entry) => ({
                country: entry.country,
                vehicleType: entry.vehicleType,
                count: parseInt(entry.count),
            })),
            skipDuplicates: false,
        });
        res.status(201).json({
            message: `${created.count} traffic entries created`,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create traffic entries" });
    }
});
exports.createTrafficEntry = createTrafficEntry;
const updateTrafficEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { country, vehicleType, count } = req.body;
    try {
        const updated = yield db_1.default.traffic.update({
            where: { id: parseInt(id) },
            data: {
                country,
                vehicleType,
                count: count !== undefined ? parseInt(count) : undefined,
            },
        });
        res.json(updated);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "Traffic entry not found" });
    }
});
exports.updateTrafficEntry = updateTrafficEntry;
const deleteTrafficEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.traffic.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // No Content
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "Traffic entry not found" });
    }
});
exports.deleteTrafficEntry = deleteTrafficEntry;
