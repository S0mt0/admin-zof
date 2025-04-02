import { Route, Routes } from "react-router-dom";

import { PersistLogin, RequireAuth } from "./components/auth";
import { RegistrationPage } from "./pages/register";
import { LoginPage } from "./pages/login";
import { DashboardLayout } from "./components/dashboard";
import { NotFoundPage } from "./pages/not-found";
import { BlogsPage } from "./pages/blogs";
import { SingleBlogPage } from "./pages/blog";
import { Editor } from "./pages/editor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/editor" element={<Editor />} />
            <Route path="blogs/:blogId" element={<SingleBlogPage />} />
            <Route
              path="blogs/editor/:blogId"
              element={<div>edit single blog page</div>}
            />

            <Route path="events" element={<div>events page</div>} />
            <Route path="events/:id" element={<div>single blog page</div>} />

            <Route path="team" element={<div>team page</div>} />
            <Route path="team/:id" element={<div>single blog page</div>} />

            <Route path="profile" element={<div>profile page</div>} />
            <Route path="change-password" element={<div>passwor page</div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
