import { Route, Routes } from "react-router-dom";

import { PersistLogin, RequireAuth } from "./components/auth";
import { RegistrationPage } from "./pages/register";
import { LoginPage } from "./pages/login";
import { DashboardLayout } from "./components/dashboard";
import { NotFoundPage } from "./pages/not-found";
import { BlogsPage } from "./pages/blogs";
import { SingleBlogPage } from "./pages/blog";
import { Editor } from "./pages/editor";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { VerifyOTPPage } from "./pages/verify-otp";
import { ResetPasswordPage } from "./pages/reset-password";
import { EventsPage } from "./pages/events";
import { SingleEventPage } from "./pages/event";
import { EventEditorPage } from "./pages/event-editor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-otp" element={<VerifyOTPPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Blogs */}
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/editor" element={<Editor type="new" />} />
            <Route path="blogs/:blogId" element={<SingleBlogPage />} />
            <Route
              path="blogs/editor/:blogId"
              element={<Editor type="edit" />}
            />

            {/* Events */}
            <Route path="events" element={<EventsPage />} />
            <Route
              path="events/editor"
              element={<EventEditorPage type="new" />}
            />
            <Route path="events/:eventId" element={<SingleEventPage />} />
            <Route
              path="events/editor/:eventId"
              element={<EventEditorPage type="edit" />}
            />

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
