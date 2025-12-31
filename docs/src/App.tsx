import { ThemeProvider } from "./contexts/theme-context";
import { DesktopProvider } from "./contexts/desktop-context";
import { OverlayProvider, AlertProvider, ToastProvider } from "@smc/darwin-ui";
import { Desktop } from "./components/desktop/Desktop";

function App() {
  return (
    <ThemeProvider>
      <DesktopProvider>
        <OverlayProvider>
          <AlertProvider>
            <ToastProvider>
              <Desktop />
            </ToastProvider>
          </AlertProvider>
        </OverlayProvider>
      </DesktopProvider>
    </ThemeProvider>
  );
}

export default App;
