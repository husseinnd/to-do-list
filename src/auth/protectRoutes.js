import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export const ProtectRoutes = ({ children }) => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
