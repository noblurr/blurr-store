import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams();

  const product = {
    id,
    title: "BMW Account",
    price: 100,
    description: "Полностью прокачанный аккаунт",
  };

  return (
    <div style={{ padding: "15px" }}>
      <h2>{product.title}</h2>

      <p style={{ color: "#aaa" }}>{product.description}</p>

      <div style={styles.box}>
        <h3>{product.price} ⭐</h3>
        <button style={styles.button}>Купить</button>
      </div>
    </div>
  );
}

const styles = {
  box: {
    marginTop: "20px",
    padding: "15px",
    background: "#1a1a1a",
    borderRadius: "12px",
  },
  button: {
    marginTop: "10px",
    width: "100%",
    padding: "15px",
    background: "#00d26a",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
  },
};