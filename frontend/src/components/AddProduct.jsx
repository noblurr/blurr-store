import { useState, useEffect } from "react";
import { api } from "../api/client";

export default function AddProduct({ onAdd, editingProduct }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "car",
    brand: "bmw",
    image: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        // ✏️ UPDATE
        await api.patch(`/products/${editingProduct.id}`, form);
      } else {
        // ➕ CREATE
        await api.post("/products", form);
      }

      onAdd();

      setForm({
        title: "",
        price: "",
        category: "car",
        brand: "bmw",
        image: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input name="title" placeholder="Название" value={form.title} onChange={handleChange} />
      <input name="price" placeholder="Цена" value={form.price} onChange={handleChange} />
      <input name="image" placeholder="Ссылка на фото" value={form.image} onChange={handleChange} />

      <button onClick={handleSubmit}>
        {editingProduct ? "Сохранить" : "Добавить"}
      </button>
    </div>
  );
}