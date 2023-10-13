import { Navigate, Outlet, useLocation } from "react-router-dom";

// Hooks
import { useAuth } from "@/providers/auth-provider";

import { Sidebar } from "./Sidebar";

export const AuthLayout = () => {
  const location = useLocation();
  const auth = useAuth();

  return auth?.user !== undefined ? (
    <div className="flex">
      <aside className="hidden sm:fixed sm:block sm:w-24 lg:w-56 xl:w-64 2xl:w-80">
        <Sidebar />
      </aside>
      <div className="w-full sm:ml-24 lg:ml-56 xl:ml-64 2xl:ml-80">
        <div className="mx-auto max-w-screen-lg px-4 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
