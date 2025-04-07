"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const traffic_route_1 = __importDefault(require("./routes/traffic.route")); // ✅ check the path!
dotenv_1.default.config();
const app = (0, express_1.default)();
const base_url = process.env.BASE_URL;
const port = process.env.PORT;
app.use(express_1.default.json());
app.use("/api/traffic", traffic_route_1.default);
app.get("/", (_, res) => {
    res.send("Traffic API is running 🚦");
});
app.listen(port, () => {
    console.log(`Server is running on ${base_url}:/${port}`);
});
