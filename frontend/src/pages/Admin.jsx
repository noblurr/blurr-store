import { useEffect, useState } from "react";
import { api } from "../api/client";
import AddProduct from "../components/AddProduct";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div style={{ padding: "15px" }}>
      <h2>Админ панель</h2>

      <AddProduct
        onAdd={fetchProducts}
        editingProduct={editingProduct}
      />

      {products.map((p) => (
        <div key={p.id} style={styles.row}>
          <span>{p.title}</span>
          <span>{p.price}$</span>

          <button onClick={() => handleEdit(p)}>✏️</button>
          <button onClick={() => handleDelete(p.id)}>🗑</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    background: "#1a1a1a",
    padding: "10px",
    borderRadius: "10px",
  },
};