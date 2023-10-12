import { Navigate, Outlet, useLocation } from "react-router-dom";

// Hooks
import { useAuth } from "@/providers/auth-provider";

import { Sidebar } from "./Sidebar";

export const AuthLayout = () => {
  const location = useLocation();
  const auth = useAuth();

  return auth?.user !== undefined ? (
    <div className="grid grid-cols-5 gap-4">
      <aside className="hidden sm:col-span-1 sm:block">
        <Sidebar />
      </aside>
      <div className="col-span-5 md:col-span-4">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
