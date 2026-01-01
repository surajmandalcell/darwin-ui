import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { DesktopProvider } from "./contexts/desktop-context";
import { OverlayProvider, AlertProvider, ToastProvider } from "@smc/darwin-ui";
import { Desktop } from "./components/desktop/Desktop";
import DocsPage from "./pages/DocsPage";
import ChangelogPage from "./pages/ChangelogPage";

function App() {
  return (
    <ThemeProvider>
      <OverlayProvider>
        <AlertProvider>
          <ToastProvider>
            <Routes>
              {/* Standalone Documentation - same as DeveloperApp */}
              <Route path="/docs" element={<DocsPage />} />

              {/* Standalone Changelog - same as ChangelogApp */}
              <Route path="/changelog" element={<ChangelogPage />} />

              {/* Desktop Environment (root) */}
              <Route
                path="/*"
                element={
                  <DesktopProvider>
                    <Desktop />
                  </DesktopProvider>
                }
              />
            </Routes>
          </ToastProvider>
        </AlertProvider>
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default App;
