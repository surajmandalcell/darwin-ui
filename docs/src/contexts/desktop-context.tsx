"use client";

import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import {
  BookOpen,
  LayoutGrid,
  Terminal,
  StickyNote,
  Image,
  Settings,
} from 'lucide-react';

// Types
export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  route?: string; // For apps that sync with URL
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: ReactNode;
  defaultSize: { width: number; height: number };
  minSize: { width: number; height: number };
  defaultRoute?: string;
}

export interface DesktopState {
  windows: WindowState[];
  activeWindowId: string | null;
  highestZIndex: number;
  isBooting: boolean;
  settings: {
    wallpaper: 'sonoma' | 'ventura' | 'monterey' | 'gradient';
    accentColor: 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';
    reduceMotion: boolean;
  };
}

// Helper to calculate responsive default size based on screen dimensions
// All windows open at 80% of viewport width and height
const getResponsiveSize = (
  _idealWidth: number,
  _idealHeight: number,
  minWidth: number,
  minHeight: number
): { width: number; height: number } => {
  if (typeof window === 'undefined') {
    // SSR fallback: use reasonable defaults
    return { width: 1200, height: 700 };
  }

  // Calculate 80% of viewport dimensions
  // Height accounts for menu bar (28px) and dock (80px)
  const width = Math.floor(window.innerWidth * 0.8);
  const height = Math.floor((window.innerHeight - 28 - 80) * 0.8);

  // Respect minimum sizes
  return {
    width: Math.max(minWidth, width),
    height: Math.max(minHeight, height),
  };
};

// App definitions
export const apps: Record<string, AppDefinition> = {
  developer: {
    id: 'developer',
    name: 'Developer',
    icon: <BookOpen className="w-full h-full" />,
    defaultSize: { width: 1100, height: 800 },
    minSize: { width: 600, height: 400 },
    defaultRoute: '/docs/getting-started/introduction',
  },
  components: {
    id: 'components',
    name: 'Components',
    icon: <LayoutGrid className="w-full h-full" />,
    defaultSize: { width: 950, height: 700 },
    minSize: { width: 500, height: 350 },
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: <Terminal className="w-full h-full" />,
    defaultSize: { width: 750, height: 500 },
    minSize: { width: 400, height: 250 },
  },
  notes: {
    id: 'notes',
    name: 'Notes',
    icon: <StickyNote className="w-full h-full" />,
    defaultSize: { width: 650, height: 550 },
    minSize: { width: 350, height: 300 },
  },
  preview: {
    id: 'preview',
    name: 'Preview',
    icon: <Image className="w-full h-full" />,
    defaultSize: { width: 850, height: 650 },
    minSize: { width: 500, height: 400 },
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    icon: <Settings className="w-full h-full" />,
    defaultSize: { width: 800, height: 600 },
    minSize: { width: 550, height: 400 },
  },
};

// Actions
type DesktopAction =
  | { type: 'OPEN_APP'; appId: string; route?: string }
  | { type: 'CLOSE_WINDOW'; windowId: string }
  | { type: 'MINIMIZE_WINDOW'; windowId: string }
  | { type: 'MAXIMIZE_WINDOW'; windowId: string }
  | { type: 'RESTORE_WINDOW'; windowId: string }
  | { type: 'FOCUS_WINDOW'; windowId: string }
  | { type: 'UPDATE_WINDOW_POSITION'; windowId: string; position: { x: number; y: number } }
  | { type: 'UPDATE_WINDOW_SIZE'; windowId: string; size: { width: number; height: number } }
  | { type: 'UPDATE_WINDOW_ROUTE'; windowId: string; route: string }
  | { type: 'SET_BOOTING'; isBooting: boolean }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<DesktopState['settings']> };

// Initial state
const initialState: DesktopState = {
  windows: [],
  activeWindowId: null,
  highestZIndex: 100,
  isBooting: true,
  settings: {
    wallpaper: 'sonoma',
    accentColor: 'blue',
    reduceMotion: false,
  },
};

// Helpers
const generateWindowId = () => `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const calculateCascadePosition = (existingWindows: WindowState[], appDef: AppDefinition): { x: number; y: number } => {
  const menuBarHeight = 28;
  const dockHeight = 80;
  const offset = 30;

  // Find windows of same app
  const sameAppWindows = existingWindows.filter(w => w.appId === appDef.id && w.isOpen && !w.isMinimized);

  if (sameAppWindows.length === 0) {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

    // Get the responsive size that will actually be used (80% of viewport)
    const responsiveSize = getResponsiveSize(
      appDef.defaultSize.width,
      appDef.defaultSize.height,
      appDef.minSize.width,
      appDef.minSize.height
    );

    // Center the window horizontally (remaining 20% split equally on both sides = 10% on each side)
    const centeredX = Math.floor((screenWidth - responsiveSize.width) / 2);

    // Center vertically in available space (below menu bar 28px, above dock 80px)
    const availableHeight = screenHeight - menuBarHeight - dockHeight;
    const centeredY = Math.floor(menuBarHeight + (availableHeight - responsiveSize.height) / 2);

    return {
      x: Math.max(0, centeredX),
      y: Math.max(menuBarHeight, centeredY),
    };
  }

  // Cascade from last window
  const lastWindow = sameAppWindows[sameAppWindows.length - 1];
  return {
    x: lastWindow.position.x + offset,
    y: lastWindow.position.y + offset,
  };
};

// Reducer
function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  switch (action.type) {
    case 'OPEN_APP': {
      const appDef = apps[action.appId];
      if (!appDef) return state;

      // Check if app window already exists and is open
      const existingWindow = state.windows.find(
        w => w.appId === action.appId && w.isOpen && !w.isMinimized
      );

      if (existingWindow) {
        // Focus existing window
        return {
          ...state,
          activeWindowId: existingWindow.id,
          windows: state.windows.map(w =>
            w.id === existingWindow.id
              ? { ...w, zIndex: state.highestZIndex + 1 }
              : w
          ),
          highestZIndex: state.highestZIndex + 1,
        };
      }

      // Check if there's a minimized window to restore
      const minimizedWindow = state.windows.find(
        w => w.appId === action.appId && w.isMinimized
      );

      if (minimizedWindow) {
        return {
          ...state,
          activeWindowId: minimizedWindow.id,
          windows: state.windows.map(w =>
            w.id === minimizedWindow.id
              ? { ...w, isMinimized: false, isOpen: true, zIndex: state.highestZIndex + 1 }
              : w
          ),
          highestZIndex: state.highestZIndex + 1,
        };
      }

      // Create new window with responsive sizing
      const responsiveSize = getResponsiveSize(
        appDef.defaultSize.width,
        appDef.defaultSize.height,
        appDef.minSize.width,
        appDef.minSize.height
      );

      const newWindow: WindowState = {
        id: generateWindowId(),
        appId: action.appId,
        title: appDef.name,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: calculateCascadePosition(state.windows, appDef),
        size: responsiveSize,
        zIndex: state.highestZIndex + 1,
        route: action.route || appDef.defaultRoute,
      };

      return {
        ...state,
        windows: [...state.windows, newWindow],
        activeWindowId: newWindow.id,
        highestZIndex: state.highestZIndex + 1,
      };
    }

    case 'CLOSE_WINDOW': {
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.windowId),
        activeWindowId: state.activeWindowId === action.windowId
          ? state.windows.filter(w => w.id !== action.windowId && w.isOpen && !w.isMinimized)[0]?.id || null
          : state.activeWindowId,
      };
    }

    case 'MINIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, isMinimized: true } : w
        ),
        activeWindowId: state.activeWindowId === action.windowId
          ? state.windows.filter(w => w.id !== action.windowId && w.isOpen && !w.isMinimized)[0]?.id || null
          : state.activeWindowId,
      };
    }

    case 'MAXIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, isMaximized: true, zIndex: state.highestZIndex + 1 } : w
        ),
        activeWindowId: action.windowId,
        highestZIndex: state.highestZIndex + 1,
      };
    }

    case 'RESTORE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, isMaximized: false, isMinimized: false } : w
        ),
      };
    }

    case 'FOCUS_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, zIndex: state.highestZIndex + 1 } : w
        ),
        activeWindowId: action.windowId,
        highestZIndex: state.highestZIndex + 1,
      };
    }

    case 'UPDATE_WINDOW_POSITION': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, position: action.position } : w
        ),
      };
    }

    case 'UPDATE_WINDOW_SIZE': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, size: action.size } : w
        ),
      };
    }

    case 'UPDATE_WINDOW_ROUTE': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, route: action.route } : w
        ),
      };
    }

    case 'SET_BOOTING': {
      return { ...state, isBooting: action.isBooting };
    }

    case 'UPDATE_SETTINGS': {
      return {
        ...state,
        settings: { ...state.settings, ...action.settings },
      };
    }

    default:
      return state;
  }
}

// Context
interface DesktopContextValue {
  state: DesktopState;
  openApp: (appId: string, route?: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
  updateWindowRoute: (windowId: string, route: string) => void;
  setBooting: (isBooting: boolean) => void;
  updateSettings: (settings: Partial<DesktopState['settings']>) => void;
  getRunningApps: () => string[];
  getWindowsByApp: (appId: string) => WindowState[];
  getActiveWindow: () => WindowState | undefined;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

// Provider
export function DesktopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(desktopReducer, initialState);

  const openApp = useCallback((appId: string, route?: string) => {
    dispatch({ type: 'OPEN_APP', appId, route });
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    dispatch({ type: 'CLOSE_WINDOW', windowId });
  }, []);

  const minimizeWindow = useCallback((windowId: string) => {
    dispatch({ type: 'MINIMIZE_WINDOW', windowId });
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', windowId });
  }, []);

  const restoreWindow = useCallback((windowId: string) => {
    dispatch({ type: 'RESTORE_WINDOW', windowId });
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    dispatch({ type: 'FOCUS_WINDOW', windowId });
  }, []);

  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    dispatch({ type: 'UPDATE_WINDOW_POSITION', windowId, position });
  }, []);

  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    dispatch({ type: 'UPDATE_WINDOW_SIZE', windowId, size });
  }, []);

  const updateWindowRoute = useCallback((windowId: string, route: string) => {
    dispatch({ type: 'UPDATE_WINDOW_ROUTE', windowId, route });
  }, []);

  const setBooting = useCallback((isBooting: boolean) => {
    dispatch({ type: 'SET_BOOTING', isBooting });
  }, []);

  const updateSettings = useCallback((settings: Partial<DesktopState['settings']>) => {
    dispatch({ type: 'UPDATE_SETTINGS', settings });
  }, []);

  const getRunningApps = useCallback(() => {
    return [...new Set(state.windows.filter(w => w.isOpen).map(w => w.appId))];
  }, [state.windows]);

  const getWindowsByApp = useCallback((appId: string) => {
    return state.windows.filter(w => w.appId === appId);
  }, [state.windows]);

  const getActiveWindow = useCallback(() => {
    return state.windows.find(w => w.id === state.activeWindowId);
  }, [state.windows, state.activeWindowId]);

  // Boot sequence - open Developer app after initial animation
  useEffect(() => {
    const bootTimer = setTimeout(() => {
      dispatch({ type: 'SET_BOOTING', isBooting: false });
    }, 800);

    const appTimer = setTimeout(() => {
      dispatch({ type: 'OPEN_APP', appId: 'developer' });
    }, 1200);

    return () => {
      clearTimeout(bootTimer);
      clearTimeout(appTimer);
    };
  }, []);

  const value: DesktopContextValue = {
    state,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    updateWindowRoute,
    setBooting,
    updateSettings,
    getRunningApps,
    getWindowsByApp,
    getActiveWindow,
  };

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
}

// Hook
export function useDesktop() {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
}

export default DesktopContext;
