import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "../redux/features/authSlice";

// Define the type for the props
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
