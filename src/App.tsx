import { Route, Routes } from "react-router-dom";

import { PersistLogin, RequireAuth } from "./components/auth";
import { RegistrationPage } from "./pages/register";
import { LoginPage } from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<div>dashboard layout</div>}>
            {/* <Route path="/dashboard" element={<DashboardLayout />}> */}
            <Route index element={<div>dashboard</div>} />
            {/* <Route index element={<Dashboard />} /> */}

            <Route path="/dashboard/blogs" element={<div>blogs page</div>} />
            {/* <Route path="/dashboard/blogs" element={<Blogs />} /> */}
            <Route
              path="/dashboard/blogs/:id"
              element={<div>single blog page</div>}
            />
            {/* <Route path="/dashboard/blogs/:id" element={<Blog />} />

            <Route path="/dashboard/events" element={<Company />} />
            <Route path="/dashboard/events/:id" element={<EachAgent />} />

            <Route path="/dashboard/team" element={<Company />} />
            <Route path="/dashboard/team/:id" element={<EachAgent />} /> */}
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<main>Page not found</main>} />
    </Routes>
  );
}

export default App;
