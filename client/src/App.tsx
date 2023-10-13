import { lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// Layouts
import { AuthLayout } from "./layout/AuthLayout";
import { PublicLayout } from "./layout/PublicLayout";
import { AccountLayout } from "./layout/AccountLayout";

// Components
import { NoContent } from "./components/NoContent";
import { PageLoading } from "./components/PageLoading";

// Container
const Home = lazy(() => import("./containers/Home"));
const Login = lazy(() => import("./containers/Login"));
const Signup = lazy(() => import("./containers/Signup"));
const Reels = lazy(() => import("./containers/Reels"));
const Explore = lazy(() => import("./containers/Explore"));
const Suggestions = lazy(() => import("./containers/Suggestions"));
const EditProfile = lazy(() => import("./containers/EditProfile"));
const Post = lazy(() => import("./containers/Post"));
const Reel = lazy(() => import("./containers/Reel"));
const Profile = lazy(() => import("./containers/Profile"));

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
            <Route path="reels" element={<Reels />} />
            <Route path="explore" element={<Explore />} />
            <Route path="explore/people" element={<Suggestions />} />
            <Route path="account" element={<AccountLayout />}>
              <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route path="p/:id" element={<Post />} />
            <Route path="reel/:id" element={<Reel />} />
            <Route path=":username" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
