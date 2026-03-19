import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET /products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// POST /products
router.post("/", async (req, res) => {
  try {
    const { title, price, category, brand, image } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        title,
        price: Number(price),
        category,
        brand,
        image,
      },
    });

    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при создании товара" });
  }
});

// DELETE /products/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ message: "Удалено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при удалении" });
  }
});

// PATCH /products/:id
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, category, brand, image } = req.body;

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title,
        price: Number(price),
        category,
        brand,
        image,
      },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при обновлении" });
  }
});

router.post("/buy/:id", async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  const token = process.env.TELEGRAM_TOKEN;

  const response = await fetch(
    `https://api.telegram.org/bot${token}/createInvoiceLink`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: product.title,
        description: "Покупка товара",
        payload: `product_${product.id}`,
        currency: "XTR", // ⭐
        prices: [
          {
            label: product.title,
            amount: product.price, // важно
          },
        ],
      }),
    }
  );

  const data = await response.json();

  res.json({ link: data.result });
});

export default router;