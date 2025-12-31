import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { DesktopProvider } from "./contexts/desktop-context";
import { OverlayProvider, AlertProvider, ToastProvider } from "@smc/darwin-ui";
import { Desktop } from "./components/desktop/Desktop";
import DocsLayout from "./layouts/DocsLayout";
import DocPageResolver from "./pages/DocPageResolver";

function App() {
  return (
    <ThemeProvider>
      <OverlayProvider>
        <AlertProvider>
          <ToastProvider>
            <Routes>
              {/* Fullscreen Documentation Routes */}
              <Route path="/docs" element={<DocsLayout />}>
                <Route index element={<DocPageResolver />} />
                <Route path="*" element={<DocPageResolver />} />
              </Route>

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
