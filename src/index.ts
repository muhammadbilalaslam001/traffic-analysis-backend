import express, { Request, Response } from "express";
import dotenv from "dotenv";
import trafficRoutes from "./routes/traffic.route"; // ✅ check the path!

dotenv.config();

const app = express();
const base_url = process.env.BASE_URL;
const port = process.env.PORT;

app.use(express.json());
app.use("/api/traffic", trafficRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Traffic API is running 🚦");
});

app.listen(port, () => {
  console.log(`Server is running on ${base_url}:/${port}`);
});
