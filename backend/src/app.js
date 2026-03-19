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

// 📡 Telegram Webhook
app.post("/webhook", async (req, res) => {
  const body = req.body;

  console.log("Webhook received:", body);

  // ✅ Проверка pre_checkout_query (Telegram перед оплатой)
  if (body.pre_checkout_query) {
    return res.json({ ok: true });
  }

  // ✅ После успешной оплаты
  if (body.message?.successful_payment) {
    console.log("Оплата прошла успешно!:", body.message);

    // Здесь позже можно создавать запись заказа в базе
    // await prisma.order.create({ ... })
  }

  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});