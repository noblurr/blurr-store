import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// 🔥 ВОТ ЭТО КЛЮЧЕВОЕ
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("API работает 🚀");
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});