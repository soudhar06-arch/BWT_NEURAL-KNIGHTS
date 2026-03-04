import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import { Dashboard } from "./pages/dashboard";
import { ProjectSession } from "./pages/project-session";
import { Projects } from "./pages/projects";
import { Sessions } from "./pages/sessions";
import { Settings } from "./pages/settings";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="saha-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Full screen session view */}
          <Route
            path="/projects/:projectId/session/current"
            element={<ProjectSession />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
