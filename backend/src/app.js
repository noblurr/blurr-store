import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.js";
const PORT = process.env.PORT || 3000;
import axios from "axios";

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

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

app.post("/webhook", async (req, res) => {
  const body = req.body;

  console.log("Webhook received:", body);

  // 💳 ОБЯЗАТЕЛЬНО: подтверждение оплаты
  if (body.pre_checkout_query) {
    const queryId = body.pre_checkout_query.id;

    try {
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/answerPreCheckoutQuery`,
        {
          pre_checkout_query_id: queryId,
          ok: true,
        }
      );

      console.log("Pre-checkout подтвержден ✅");
    } catch (err) {
      console.error("Ошибка подтверждения:", err.response?.data || err);
    }

    return res.sendStatus(200);
  }

  // ✅ успешная оплата
  if (body.message?.successful_payment) {
    console.log("Оплата прошла успешно! ✅");

    const payload = body.message.successful_payment.invoice_payload;
    console.log("Payload:", payload);

    // потом добавим запись в базу
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});