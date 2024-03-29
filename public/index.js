import express from "express";
import * as dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";
import bodyParser from "body-parser";
import itemRouter from "./router/api/ItemRouter.js";
import cors from "cors";
import path from "path";

dotenv.config();

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

// Bodyparser middleware
app.use(bodyParser.json());

// app.use(
//     cors({
//         origin: ["https://mernshoppinglistfrontend-production.up.railway.app"],
//     })
// );

app.use(cors());

// Write all Routes here

app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" });
});

app.use("/api/items", itemRouter);

// Ending Code
app.use(errorHandler);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

app.listen(port, () => {
    console.log(`Server is listen on port ${port}`);
});

export default app;
