import { Navigate } from "react-router-dom";
import { getTelegramUser } from "../utils/telegram";
import { ADMIN_ID } from "../utils/constants";

export default function AdminRoute({ children }) {
  let user = getTelegramUser();

  // 🔥 ВРЕМЕННО ДЛЯ ТЕСТА В БРАУЗЕРЕ
  if (!user) {
    user = { id: 7646038777 }; // 👈 твой ID
  }

  // ❌ НЕ АДМИН
  if (user.id !== ADMIN_ID) {
    return <div>Нет доступа ❌</div>;
  }

  return children;
}