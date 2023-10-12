import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const PublicLayout = () => {
  return (
    <div className="space-y-8">
      <Navbar />
      <Outlet />
    </div>
  );
};
