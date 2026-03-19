import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { api } from "../api/client";
import AddProduct from "../components/AddProduct";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
  setEditingProduct(product);
};
  const handleDelete = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    fetchProducts(); // обновляем список
  } catch (err) {
    console.error(err);
  }
};
  // ✅ функция загрузки
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ загрузка при старте
  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || p.category === category;

    const matchesBrand =
      brand === "all" || p.brand === brand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div style={styles.container}>
      <h1 style={{ color: "red" }}>
        TEST BUILD 123 🔥
      </h1>
      {/* ➕ Форма добавления */}
      <AddProduct onAdd={fetchProducts}
        editingProduct={editingProduct} 
      />

      {/* 🖼 Баннер */}
      <div style={styles.banner}>
        <img
          src="https://via.placeholder.com/400x150"
          alt="banner"
          style={styles.bannerImg}
        />
      </div>

      {/* 🔍 Поиск */}
      <input
        type="text"
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* 📂 Категории */}
      <div style={styles.categories}>
        <button style={styles.button} onClick={() => {setCategory("all");setBrand("all");}}>Все</button>
        <button style={styles.button} onClick={() => {setCategory("account");setBrand("all");}}>Аккаунты</button>

        <button
          style={{
            ...styles.button,
            background: category === "car" ? "#00d26a" : "#1a1a1a",
            color: category === "car" ? "#000" : "#fff",
          }}
          onClick={() => {
            setCategory("car");
            setBrand("all");
          }}
        >
          Авто
        </button>

        <button style={styles.button} onClick={() => {setCategory("service");setBrand("all");}}>Услуги</button>
      </div>

      {/* 🚗 Бренды */}
      {category === "car" && (
        <div style={styles.categories}>
          <button style={styles.button} onClick={() => setBrand("all")}>Все бренды</button>
          <button style={styles.button} onClick={() => setBrand("bmw")}>BMW</button>
          <button style={styles.button} onClick={() => setBrand("mercedes")}>Mercedes</button>
          <button style={styles.button} onClick={() => setBrand("audi")}>Audi</button>
        </div>
      )}

      {/* 📦 Список */}
      <div style={styles.grid}>
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} onEdit={handleEdit}/>
        ))}
      </div>

    </div>
  );
}

const styles = {
search: {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  fontSize: "16px", // 🔥 важно для мобилок
  border: "none",
  background: "#1a1a1a",
  color: "#fff",
},
  categories: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    marginTop: "10px",
  },
  banner: {
    marginBottom: "10px",
  },
bannerImg: {
  width: "100%",
  borderRadius: "16px",
  objectFit: "cover",
},
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginTop: "10px",
  },
button: {
  padding: "10px 14px",
  borderRadius: "12px",
  border: "none",
  background: "#1a1a1a",
  color: "#fff",
  whiteSpace: "nowrap",
  fontSize: "14px",
},
  container: {
  padding: "10px",
  maxWidth: "500px",
  margin: "0 auto",
  },
};