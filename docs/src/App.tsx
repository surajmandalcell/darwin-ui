import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { DesktopProvider } from "./contexts/desktop-context";
import { OverlayProvider, AlertProvider, ToastProvider } from "@pikoloo/darwin-ui";
import { Desktop } from "./components/desktop/Desktop";
import DocsPage from "./pages/DocsPage";
import ChangelogPage from "./pages/ChangelogPage";
import ShowcasePage from "./pages/ShowcasePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <ThemeProvider>
      <OverlayProvider>
        <AlertProvider>
          <ToastProvider>
            <Routes>
              {/* Showcase Landing Page */}
              <Route path="/" element={<ShowcasePage />} />

              {/* Standalone Documentation */}
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/docs/:section/:page" element={<DocsPage />} />

              {/* Standalone Changelog */}
              <Route path="/changelog" element={<ChangelogPage />} />

              {/* Desktop Environment */}
              <Route
                path="/desktop"
                element={
                  <DesktopProvider>
                    <Desktop />
                  </DesktopProvider>
                }
              />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ToastProvider>
        </AlertProvider>
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default App;
