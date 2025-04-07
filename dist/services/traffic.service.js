"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrafficEntryService = exports.updateTrafficEntryService = exports.createTrafficEntriesService = exports.getTrafficEntryByIdService = exports.getAllTrafficEntriesService = exports.getVehicleTypeTrafficService = exports.getCountryTrafficService = void 0;
const db_1 = __importDefault(require("../db"));
const getCountryTrafficService = async () => {
    const result = await db_1.default.traffic.groupBy({
        by: ["country"],
        _sum: { count: true },
    });
    return result.map((item) => ({
        country: item.country,
        count: item._sum.count || 0,
    }));
};
exports.getCountryTrafficService = getCountryTrafficService;
const getVehicleTypeTrafficService = async () => {
    const result = await db_1.default.traffic.groupBy({
        by: ["vehicleType"],
        _sum: { count: true },
    });
    return result.map((item) => ({
        vehicleType: item.vehicleType,
        count: item._sum.count || 0,
    }));
};
exports.getVehicleTypeTrafficService = getVehicleTypeTrafficService;
const getAllTrafficEntriesService = async () => {
    return await db_1.default.traffic.findMany({
        orderBy: { createdAt: "desc" },
    });
};
exports.getAllTrafficEntriesService = getAllTrafficEntriesService;
const getTrafficEntryByIdService = async (id) => {
    return await db_1.default.traffic.findUnique({
        where: { id },
    });
};
exports.getTrafficEntryByIdService = getTrafficEntryByIdService;
const createTrafficEntriesService = async (entries) => {
    return await db_1.default.traffic.createMany({
        data: entries.map((entry) => ({
            country: entry.country,
            vehicleType: entry.vehicleType,
            count: typeof entry.count === 'string' ? parseInt(entry.count) : entry.count,
        })),
        skipDuplicates: false,
    });
};
exports.createTrafficEntriesService = createTrafficEntriesService;
const updateTrafficEntryService = async (id, data) => {
    return await db_1.default.traffic.update({
        where: { id },
        data: {
            ...data,
            count: data.count !== undefined ? (typeof data.count === 'string' ? parseInt(data.count) : data.count) : undefined,
        },
    });
};
exports.updateTrafficEntryService = updateTrafficEntryService;
const deleteTrafficEntryService = async (id) => {
    return await db_1.default.traffic.delete({
        where: { id },
    });
};
exports.deleteTrafficEntryService = deleteTrafficEntryService;
