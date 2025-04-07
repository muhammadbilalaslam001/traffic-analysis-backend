"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const traffic_route_1 = __importDefault(require("../routes/traffic.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/traffic", traffic_route_1.default);
// Mock prisma services
jest.mock("../services/traffic.service", () => ({
    getCountryTrafficService: jest
        .fn()
        .mockResolvedValue([{ country: "USA", count: 100 }]),
    getVehicleTypeTrafficService: jest
        .fn()
        .mockResolvedValue([{ vehicleType: "Car", count: 50 }]),
    getAllTrafficEntriesService: jest
        .fn()
        .mockResolvedValue([
        { id: 1, country: "USA", vehicleType: "Car", count: 50 },
    ]),
    getTrafficEntryByIdService: jest
        .fn()
        .mockImplementation((id) => id === 1 ? { id: 1, country: "USA", vehicleType: "Car", count: 50 } : null),
    createTrafficEntriesService: jest.fn().mockResolvedValue({ count: 1 }),
    updateTrafficEntryService: jest.fn().mockResolvedValue({
        id: 1,
        country: "USA",
        vehicleType: "Bike",
        count: 20,
    }),
    deleteTrafficEntryService: jest.fn().mockResolvedValue({}),
}));
describe("Traffic API", () => {
    it("GET /traffic/countries", async () => {
        const res = await (0, supertest_1.default)(app).get("/traffic/countries");
        expect(res.statusCode).toBe(200);
        expect(res.body.data[0]).toHaveProperty("country", "USA");
    });
    it("GET /traffic/vehicle-types", async () => {
        const res = await (0, supertest_1.default)(app).get("/traffic/vehicle-types");
        expect(res.statusCode).toBe(200);
        expect(res.body.data[0]).toHaveProperty("vehicleType", "Car");
    });
    it("GET /traffic/", async () => {
        const res = await (0, supertest_1.default)(app).get("/traffic/");
        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty("country", "USA");
    });
    it("POST /traffic/ - create single", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/traffic")
            .send({ country: "UK", vehicleType: "Bus", count: 15 });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toMatch(/1 traffic entries created/);
    });
    it("PATCH /traffic/:id", async () => {
        const res = await (0, supertest_1.default)(app)
            .patch("/traffic/1")
            .send({ vehicleType: "Bike", count: 20 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("vehicleType", "Bike");
    });
    it("DELETE /traffic/:id", async () => {
        const res = await (0, supertest_1.default)(app).delete("/traffic/1");
        expect(res.statusCode).toBe(204);
    });
});
