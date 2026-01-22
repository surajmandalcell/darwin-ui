import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { DesktopProvider } from "./contexts/desktop-context";
import { OverlayProvider, AlertProvider, ToastProvider } from "@pikoloo/darwin-ui";
import { Desktop } from "./components/desktop/Desktop";
import DocsPage from "./pages/DocsPage";
import ChangelogPage from "./pages/ChangelogPage";
import ShowcasePage from "./pages/ShowcasePage";

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
            </Routes>
          </ToastProvider>
        </AlertProvider>
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default App;
