import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Layouts
import { AuthLayout } from "./layout/AuthLayout";
import { PublicLayout } from "./layout/PublicLayout";

// Components
import { NoContent } from "./components/NoContent";
import { PageLoading } from "./components/PageLoading";

// Container
const Home = lazy(() => import("./containers/Home"));
const Login = lazy(() => import("./containers/Login"));
const Signup = lazy(() => import("./containers/Signup"));

const App = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route
          path="*"
          element={<NoContent title="Upps!" subtitle="Page not found." />}
        />
        <Route path="/" element={<Outlet />}>
          {/* PUBLIC ROUTES */}
          <Route element={<PublicLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* AUTH ROUTES */}
          <Route element={<AuthLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
