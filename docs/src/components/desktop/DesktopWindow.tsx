"use client";

import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useDesktop, type WindowState, type AppDefinition } from '../../contexts/desktop-context';

// Import app components
import { DeveloperApp } from './apps/DeveloperApp';
import { ExampleApp } from './apps/ExampleApp';
import { TerminalApp } from './apps/TerminalApp';
import { NotesApp } from './apps/NotesApp';
import { SettingsApp } from './apps/SettingsApp';
import { AboutApp } from './apps/AboutApp';
import { ChangelogApp } from './apps/ChangelogApp';

interface DesktopWindowProps {
  windowState: WindowState;
  appDef: AppDefinition;
  isFocused: boolean;
}

// Map app IDs to components
const appComponents: Record<string, React.ComponentType<{ windowState: WindowState }>> = {
  developer: DeveloperApp,
  example: ExampleApp,
  terminal: TerminalApp,
  notes: NotesApp,
  settings: SettingsApp,
  about: AboutApp,
  changelog: ChangelogApp,
};

// macOS Traffic Light Colors (from official Apple design)
const trafficLightColors = {
  close: {
    bg: '#ff5f57',
    bgHover: '#ff5f57',
    bgActive: '#bf4942',
    symbol: '#4d0000',
    symbolActive: '#190000',
  },
  minimize: {
    bg: '#febc2e',
    bgHover: '#febc2e',
    bgActive: '#bf8e22',
    symbol: '#995700',
    symbolActive: '#592800',
  },
  maximize: {
    bg: '#28c840',
    bgHover: '#28c840',
    bgActive: '#1d9730',
    symbol: '#006500',
    symbolActive: '#003200',
  },
  unfocused: '#ddd',
};

// Traffic Light Button Component
interface TrafficLightButtonProps {
  type: 'close' | 'minimize' | 'maximize';
  onClick: (e: React.MouseEvent) => void;
  isFocused: boolean;
  isGroupHovered: boolean;
  isMaximized?: boolean;
}

function TrafficLightButton({ type, onClick, isFocused, isGroupHovered, isMaximized }: TrafficLightButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const colors = trafficLightColors[type];

  const bgColor = !isFocused
    ? trafficLightColors.unfocused
    : isPressed
      ? colors.bgActive
      : colors.bg;

  const symbolColor = isPressed ? colors.symbolActive : colors.symbol;

  return (
    <button
      className="w-3 h-3 rounded-full relative flex items-center justify-center transition-colors duration-75"
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {/* Symbol - only visible on group hover when window is focused */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isGroupHovered && isFocused ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        {type === 'close' && (
          // X symbol - two rotated lines
          <svg width="6" height="6" viewBox="0 0 6 6" className="overflow-visible">
            <line x1="0" y1="0" x2="6" y2="6" stroke={symbolColor} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="0" x2="0" y2="6" stroke={symbolColor} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
        {type === 'minimize' && (
          // Minus symbol - horizontal line
          <svg width="8" height="2" viewBox="0 0 8 2">
            <line x1="0" y1="1" x2="8" y2="1" stroke={symbolColor} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
        {type === 'maximize' && (
          // Expand/Plus symbol - two diagonal arrows pointing outward (macOS Sonoma style)
          <svg width="6" height="6" viewBox="0 0 6 6" className="overflow-visible">
            {isMaximized ? (
              // When maximized, show inward arrows (restore)
              <>
                <polyline points="0,2 2,2 2,0" fill="none" stroke={symbolColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="6,4 4,4 4,6" fill="none" stroke={symbolColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              // When normal, show outward arrows (expand)
              <>
                <polyline points="2,0 0,0 0,2" fill="none" stroke={symbolColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="4,6 6,6 6,4" fill="none" stroke={symbolColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            )}
          </svg>
        )}
      </motion.div>
    </button>
  );
}

// Traffic Lights Container Component
interface TrafficLightsProps {
  onClose: (e: React.MouseEvent) => void;
  onMinimize: (e: React.MouseEvent) => void;
  onMaximize: (e: React.MouseEvent) => void;
  isFocused: boolean;
  isMaximized: boolean;
}

function TrafficLights({ onClose, onMinimize, onMaximize, isFocused, isMaximized }: TrafficLightsProps) {
  const [isGroupHovered, setIsGroupHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={() => setIsGroupHovered(true)}
      onMouseLeave={() => setIsGroupHovered(false)}
    >
      <TrafficLightButton
        type="close"
        onClick={onClose}
        isFocused={isFocused}
        isGroupHovered={isGroupHovered}
      />
      <TrafficLightButton
        type="minimize"
        onClick={onMinimize}
        isFocused={isFocused}
        isGroupHovered={isGroupHovered}
      />
      <TrafficLightButton
        type="maximize"
        onClick={onMaximize}
        isFocused={isFocused}
        isGroupHovered={isGroupHovered}
        isMaximized={isMaximized}
      />
    </div>
  );
}

export function DesktopWindow({ windowState, appDef, isFocused }: DesktopWindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktop();

  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [initialSize, setInitialSize] = useState(windowState.size);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [initialWindowPos, setInitialWindowPos] = useState(windowState.position);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use motion values for drag transform - these reset to 0 after we update position
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Constants for window constraints
  const MENU_BAR_HEIGHT = 28;
  const DOCK_HEIGHT = 70;
  const MIN_VISIBLE_PIXELS = 100;
  const SNAP_THRESHOLD = 20; // Pixels from edge to trigger snap

  // Get the app component
  const AppComponent = appComponents[windowState.appId];

  // Force maximized behavior on mobile
  const effectiveIsMaximized = windowState.isMaximized || isMobile;

  // Handle drag start
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  // Handle drag end - update position and reset transform with snap-to-edge behavior
  const handleDragEnd = useCallback(
    () => {
      setIsDragging(false);

      // Get the current transform offset from motion values
      const offsetX = dragX.get();
      const offsetY = dragY.get();

      // Calculate new position
      let newX = windowState.position.x + offsetX;
      let newY = windowState.position.y + offsetY;

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate bounds - keep MIN_VISIBLE_PIXELS visible on each side
      const minX = -windowState.size.width + MIN_VISIBLE_PIXELS;
      const maxX = viewportWidth - MIN_VISIBLE_PIXELS;
      const minY = MENU_BAR_HEIGHT;
      const maxY = viewportHeight - DOCK_HEIGHT - MIN_VISIBLE_PIXELS;

      // Snap to edges if close enough
      // Snap to left edge
      if (newX >= 0 && newX <= SNAP_THRESHOLD) {
        newX = 0;
      }
      // Snap to right edge
      if (newX + windowState.size.width >= viewportWidth - SNAP_THRESHOLD &&
          newX + windowState.size.width <= viewportWidth) {
        newX = viewportWidth - windowState.size.width;
      }
      // Snap to top (below menu bar)
      if (newY >= MENU_BAR_HEIGHT && newY <= MENU_BAR_HEIGHT + SNAP_THRESHOLD) {
        newY = MENU_BAR_HEIGHT;
      }
      // Snap to bottom (above dock)
      const bottomEdge = viewportHeight - DOCK_HEIGHT;
      if (newY + windowState.size.height >= bottomEdge - SNAP_THRESHOLD &&
          newY + windowState.size.height <= bottomEdge) {
        newY = bottomEdge - windowState.size.height;
      }

      // Enforce strict bounds - window can never fully disappear
      newX = Math.max(minX, Math.min(newX, maxX));
      newY = Math.max(minY, Math.min(newY, maxY));

      // Update position in state
      updateWindowPosition(windowState.id, {
        x: newX,
        y: newY,
      });

      // Reset motion values to 0 (the transform)
      dragX.set(0);
      dragY.set(0);
    },
    [windowState.id, windowState.position, windowState.size, updateWindowPosition, dragX, dragY, MIN_VISIBLE_PIXELS, MENU_BAR_HEIGHT, DOCK_HEIGHT, SNAP_THRESHOLD]
  );

  // Handle resize
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      setResizeDirection(direction);
      setInitialSize(windowState.size);
      setInitialMousePos({ x: e.clientX, y: e.clientY });
      setInitialWindowPos(windowState.position);
    },
    [windowState.size, windowState.position]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - initialMousePos.x;
      const deltaY = e.clientY - initialMousePos.y;

      // Get minimum sizes - use strict enforcement
      const minWidth = appDef.minSize.width;
      const minHeight = appDef.minSize.height;

      // Get viewport bounds for clamping
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Start from the CAPTURED initial values, not the live state
      let newWidth = initialSize.width;
      let newHeight = initialSize.height;
      let newX = initialWindowPos.x;
      let newY = initialWindowPos.y;

      // Handle east (right) edge resize
      if (resizeDirection?.includes('e')) {
        newWidth = initialSize.width + deltaX;
      }

      // Handle west (left) edge resize - moves the left edge
      if (resizeDirection?.includes('w')) {
        // New width = initial width minus how much we moved right
        newWidth = initialSize.width - deltaX;
        // New X = initial X plus how much we moved right
        newX = initialWindowPos.x + deltaX;

        // Clamp: don't let width go below minimum
        if (newWidth < minWidth) {
          newWidth = minWidth;
          // Adjust X so the right edge stays in place
          newX = initialWindowPos.x + (initialSize.width - minWidth);
        }

        // Clamp: don't let X go negative
        if (newX < 0) {
          newX = 0;
          newWidth = initialWindowPos.x + initialSize.width;
        }
      }

      // Handle south (bottom) edge resize
      if (resizeDirection?.includes('s')) {
        newHeight = initialSize.height + deltaY;
      }

      // Handle north (top) edge resize - moves the top edge
      if (resizeDirection?.includes('n')) {
        // New height = initial height minus how much we moved down
        newHeight = initialSize.height - deltaY;
        // New Y = initial Y plus how much we moved down
        newY = initialWindowPos.y + deltaY;

        // Clamp: don't let height go below minimum
        if (newHeight < minHeight) {
          newHeight = minHeight;
          // Adjust Y so the bottom edge stays in place
          newY = initialWindowPos.y + (initialSize.height - minHeight);
        }

        // Clamp: don't let Y go above menu bar
        if (newY < MENU_BAR_HEIGHT) {
          newY = MENU_BAR_HEIGHT;
          newHeight = initialWindowPos.y + initialSize.height - MENU_BAR_HEIGHT;
        }
      }

      // Final safety clamps
      newWidth = Math.max(minWidth, Math.min(newWidth, viewportWidth - newX));
      newHeight = Math.max(minHeight, Math.min(newHeight, viewportHeight - DOCK_HEIGHT - newY));
      newX = Math.max(0, newX);
      newY = Math.max(MENU_BAR_HEIGHT, newY);

      // Only update if values are valid (finite and positive)
      if (isFinite(newWidth) && isFinite(newHeight) && newWidth > 0 && newHeight > 0) {
        updateWindowSize(windowState.id, { width: newWidth, height: newHeight });
      }

      if (resizeDirection?.includes('w') || resizeDirection?.includes('n')) {
        if (isFinite(newX) && isFinite(newY)) {
          updateWindowPosition(windowState.id, { x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDirection, initialSize, initialMousePos, initialWindowPos, windowState.id, appDef.minSize, updateWindowSize, updateWindowPosition, MENU_BAR_HEIGHT, DOCK_HEIGHT]);

  // Handle traffic light buttons
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(windowState.id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(windowState.id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (windowState.isMaximized) {
      restoreWindow(windowState.id);
    } else {
      maximizeWindow(windowState.id);
    }
  };

  // Calculate position and size
  const position = effectiveIsMaximized
    ? { x: 0, y: MENU_BAR_HEIGHT }
    : windowState.position;

  const size = effectiveIsMaximized
    ? { width: window.innerWidth, height: window.innerHeight - MENU_BAR_HEIGHT - DOCK_HEIGHT }
    : windowState.size;

  // Calculate drag constraints to prevent windows from disappearing
  // These are relative to the current position, not absolute viewport coordinates
  const dragConstraints = {
    left: -windowState.size.width + MIN_VISIBLE_PIXELS - windowState.position.x,
    right: window.innerWidth - MIN_VISIBLE_PIXELS - windowState.position.x,
    top: MENU_BAR_HEIGHT - windowState.position.y,
    bottom: window.innerHeight - DOCK_HEIGHT - MIN_VISIBLE_PIXELS - windowState.position.y,
  };

  // Dynamic shadow based on focus state
  const shadowStyle = isFocused
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.4)'
    : '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 10px -4px rgba(0, 0, 0, 0.2)';

  return (
    <motion.div
      ref={windowRef}
      className="absolute pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      drag={!effectiveIsMaximized}
      dragControls={dragControls}
      dragConstraints={dragConstraints}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: windowState.zIndex,
        x: dragX,
        y: dragY,
        willChange: isDragging ? 'transform' : 'auto',
      }}
      onClick={() => focusWindow(windowState.id)}
    >
      {/* Window Frame */}
      <motion.div
        className="w-full h-full rounded-xl overflow-hidden flex flex-col"
        animate={{
          boxShadow: shadowStyle,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          background: 'rgb(23 23 23 / 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Title Bar */}
        <div
          className="flex items-center h-9 px-3 bg-black/20 border-b border-white/10 cursor-default select-none shrink-0"
          onPointerDown={(e) => {
            if (!effectiveIsMaximized) {
              dragControls.start(e);
            }
          }}
          onDoubleClick={handleMaximize}
        >
          {/* Traffic Lights - macOS style with group hover behavior */}
          <TrafficLights
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            isFocused={isFocused}
            isMaximized={effectiveIsMaximized}
          />

          {/* Title with truncation */}
          <div className="flex-1 text-center overflow-hidden px-4">
            <motion.span
              className="text-[13px] font-medium block truncate"
              animate={{ color: isFocused ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)' }}
              transition={{ duration: 0.2 }}
              title={windowState.title}
            >
              {windowState.title}
            </motion.span>
          </div>

          {/* Right side actions - External link for Developer app */}
          <div className="w-14 flex items-center justify-end">
            {windowState.appId === 'developer' && (
              <motion.button
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('/docs', '_blank');
                }}
                title="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5 text-white/60 hover:text-white/90" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {AppComponent && <AppComponent windowState={windowState} />}
        </div>

        {/* Border overlay for focus state */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: isFocused
              ? 'inset 0 0 0 1px rgba(255,255,255,0.2)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Resize Handles (only when not maximized) */}
      {!effectiveIsMaximized && (
        <>
          {/* Corners - larger hit areas with subtle visual indicators on hover */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-5 h-5 cursor-se-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute bottom-1 right-1 w-2 h-2 opacity-0 transition-opacity bg-white rounded-sm" />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -left-1 w-5 h-5 cursor-sw-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute bottom-1 left-1 w-2 h-2 opacity-0 transition-opacity bg-white rounded-sm" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 cursor-ne-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute top-1 right-1 w-2 h-2 opacity-0 transition-opacity bg-white rounded-sm" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -left-1 w-5 h-5 cursor-nw-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute top-1 left-1 w-2 h-2 opacity-0 transition-opacity bg-white rounded-sm" />
          </motion.div>
          {/* Edges with hover indicators */}
          <div
            className="absolute top-3 bottom-3 -right-1 w-3 cursor-e-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          >
            <div className="absolute inset-y-0 right-1 w-0.5 opacity-0 transition-opacity bg-white rounded-full" />
          </div>
          <div
            className="absolute top-3 bottom-3 -left-1 w-3 cursor-w-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          >
            <div className="absolute inset-y-0 left-1 w-0.5 opacity-0 transition-opacity bg-white rounded-full" />
          </div>
          <div
            className="absolute -bottom-1 left-3 right-3 h-3 cursor-s-resize group"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          >
            <div className="absolute inset-x-0 bottom-1 h-0.5 opacity-0 transition-opacity bg-white rounded-full" />
          </div>
          <div
            className="absolute -top-1 left-3 right-3 h-3 cursor-n-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          >
            <div className="absolute inset-x-0 top-1 h-0.5 opacity-0 transition-opacity bg-white rounded-full" />
          </div>
        </>
      )}
    </motion.div>
  );
}

export default DesktopWindow;
