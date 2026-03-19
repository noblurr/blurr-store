import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.js";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(express.json());

// 🔥 ВОТ ЭТО КЛЮЧЕВОЕ
app.use("/products", productsRoutes);

app.get("/", (req, res) => {
  res.send("API работает 🚀");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});