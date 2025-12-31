import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
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
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/docs" element={<DocsLayout />}>
            <Route path="*" element={<DocPageResolver />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
