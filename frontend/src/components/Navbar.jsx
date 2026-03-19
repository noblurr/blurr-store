import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={styles.nav}>
      <NavLink to="/" style={styles.link}>
        🏠
        <span>Главная</span>
      </NavLink>

      <NavLink to="/orders" style={styles.link}>
        📦
        <span>Покупки</span>
      </NavLink>

      <NavLink to="/profile" style={styles.link}>
        👤
        <span>Профиль</span>
      </NavLink>
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65px",
    background: "#111",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid #222",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
    color: "#aaa",
    textDecoration: "none",
  },
};