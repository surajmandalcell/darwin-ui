import { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DocsLayout from "./layouts/DocsLayout";

// Placeholder for individual doc pages
// In a real app we'd map these dynamically or import them.
// For now, I'll create a generic DocPage component that renders content based on route
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
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/docs" element={<DocsLayout />}>
          <Route path="*" element={<DocPageResolver />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
