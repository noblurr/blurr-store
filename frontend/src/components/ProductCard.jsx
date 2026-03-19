import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function ProductCard({ product, onDelete, onEdit }) {
  const navigate = useNavigate();
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;
  const ADMIN_ID = 7646038777;

  return (
    <div style={styles.card} onClick={() => navigate(`/product/${product.id}`)}>
      
      {/* 📷 Фото */}
      <div style={styles.imageWrapper}>
        <img src={product.image} alt="" style={styles.image} />
      </div>

      {/* 📄 Инфа */}
      <div style={styles.info}>
        <h3 style={styles.title}>{product.title}</h3>

        <span style={styles.price}>{product.price} ⭐</span>
        <button
  onClick={async (e) => {
    e.stopPropagation();

    try {
      const res = await api.post(`/products/buy/${product.id}`, {
      userId: user?.id,
      });

      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openInvoice(res.data.link);
      } else {
        window.open(res.data.link, "_blank");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка при оплате");
    }
  }}
>
  Купить ⭐
</button>
        {user?.id === ADMIN_ID && (
  <>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onEdit(product);
      }}
      style={styles.editBtn}
    >
      Редактировать
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(product.id);
      }}
      style={styles.deleteBtn}
    >
      Удалить
    </button>
  </>
)}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#1a1a1a",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "0.2s",
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: "4 / 3",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  info: {
    padding: "10px",
  },
  title: {
    fontSize: "14px",
    margin: "0 0 5px 0",
    color: "#ffffff",
  },
  price: {
    color: "#00d26a",
    fontWeight: "bold",
  },
  deleteBtn: {
  marginTop: "8px",
  width: "100%",
  padding: "6px",
  borderRadius: "8px",
  border: "none",
  background: "#ff4d4d",
  color: "#fff",
  cursor: "pointer",
  },
  editBtn: {
  marginTop: "6px",
  width: "100%",
  padding: "6px",
  borderRadius: "8px",
  border: "none",
  background: "#ffaa00",
  color: "#000",
  cursor: "pointer",
  },
  cardHover: {
  transform: "scale(1.02)",
  },
};