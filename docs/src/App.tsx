import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { OverlayProvider, AlertProvider, ToastProvider } from "@smc/darwin-ui";
import LandingPage from "./pages/LandingPage";
import DocsLayout from "./layouts/DocsLayout";
import DocPageResolver from "./pages/DocPageResolver";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <OverlayProvider>
        <AlertProvider>
          <ToastProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/docs" element={<DocsLayout />}>
                  <Route path="*" element={<DocPageResolver />} />
                </Route>
              </Routes>
            </Router>
          </ToastProvider>
        </AlertProvider>
      </OverlayProvider>
    </ThemeProvider>
  );
}

export default App;
