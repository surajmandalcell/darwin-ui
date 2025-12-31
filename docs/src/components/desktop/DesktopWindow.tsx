"use client";

import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useDragControls, type PanInfo, AnimatePresence } from 'framer-motion';
import { useDesktop, type WindowState, type AppDefinition } from '../../contexts/desktop-context';

// Import app components
import { DeveloperApp } from './apps/DeveloperApp';
import { TerminalApp } from './apps/TerminalApp';
import { NotesApp } from './apps/NotesApp';
import { SettingsApp } from './apps/SettingsApp';

interface DesktopWindowProps {
  windowState: WindowState;
  appDef: AppDefinition;
  isFocused: boolean;
}

// Map app IDs to components
const appComponents: Record<string, React.ComponentType<{ windowState: WindowState }>> = {
  developer: DeveloperApp,
  terminal: TerminalApp,
  notes: NotesApp,
  settings: SettingsApp,
};

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
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const dragStartOffset = useRef({ x: 0, y: 0 });
  const [trafficLightsHovered, setTrafficLightsHovered] = useState(false);
  const [wasFocused, setWasFocused] = useState(isFocused);
  const [showFocusPulse, setShowFocusPulse] = useState(false);

  // Detect focus gain for pulse animation
  useEffect(() => {
    if (isFocused && !wasFocused) {
      setShowFocusPulse(true);
      const timer = setTimeout(() => setShowFocusPulse(false), 300);
      return () => clearTimeout(timer);
    }
    setWasFocused(isFocused);
  }, [isFocused, wasFocused]);

  // Get the app component
  const AppComponent = appComponents[windowState.appId];

  // Handle drag start - capture offset between cursor and window origin
  const handleDragStart = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent) => {
      const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : (event as MouseEvent).clientY;

      // Store the offset between cursor position and window position
      dragStartOffset.current = {
        x: clientX - windowState.position.x,
        y: clientY - windowState.position.y,
      };
    },
    [windowState.position]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      // Calculate new position: cursor position minus the initial offset
      const newX = info.point.x - dragStartOffset.current.x;
      const newY = info.point.y - dragStartOffset.current.y;

      // Constrain to viewport
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      const minY = 28; // Below menu bar

      updateWindowPosition(windowState.id, {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY)),
      });
    },
    [windowState.id, updateWindowPosition]
  );

  // Handle resize
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      setResizeDirection(direction);
      setInitialSize(windowState.size);
      setInitialPos({ x: e.clientX, y: e.clientY });
    },
    [windowState.size]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - initialPos.x;
      const deltaY = e.clientY - initialPos.y;

      let newWidth = initialSize.width;
      let newHeight = initialSize.height;
      let newX = windowState.position.x;
      let newY = windowState.position.y;

      if (resizeDirection?.includes('e')) {
        newWidth = Math.max(appDef.minSize.width, initialSize.width + deltaX);
      }
      if (resizeDirection?.includes('w')) {
        const widthDelta = Math.min(deltaX, initialSize.width - appDef.minSize.width);
        newWidth = initialSize.width - widthDelta;
        newX = windowState.position.x + widthDelta;
      }
      if (resizeDirection?.includes('s')) {
        newHeight = Math.max(appDef.minSize.height, initialSize.height + deltaY);
      }
      if (resizeDirection?.includes('n')) {
        const heightDelta = Math.min(deltaY, initialSize.height - appDef.minSize.height);
        newHeight = initialSize.height - heightDelta;
        newY = windowState.position.y + heightDelta;
      }

      updateWindowSize(windowState.id, { width: newWidth, height: newHeight });
      if (resizeDirection?.includes('w') || resizeDirection?.includes('n')) {
        updateWindowPosition(windowState.id, { x: newX, y: newY });
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
  }, [isResizing, resizeDirection, initialSize, initialPos, windowState, appDef.minSize, updateWindowSize, updateWindowPosition]);

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
  const position = windowState.isMaximized
    ? { x: 0, y: 28 }
    : windowState.position;

  const size = windowState.isMaximized
    ? { width: window.innerWidth, height: window.innerHeight - 28 - 70 }
    : windowState.size;

  // Dynamic shadow based on focus state
  const shadowStyle = isFocused
    ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.4)'
    : '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 10px -4px rgba(0, 0, 0, 0.2)';

  return (
    <motion.div
      ref={windowRef}
      className="absolute pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: windowState.zIndex,
      }}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{
        opacity: 1,
        scale: showFocusPulse ? 1.01 : 1,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.8,
        scale: { duration: 0.15 },
      }}
      drag={!windowState.isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
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

        {/* Title Bar */}
        <div
          className="flex items-center h-9 px-3 bg-black/20 border-b border-white/10 cursor-default select-none shrink-0"
          onPointerDown={(e) => {
            if (!windowState.isMaximized) {
              dragControls.start(e);
            }
          }}
          onDoubleClick={handleMaximize}
        >
          {/* Traffic Lights */}
          <div
            className="flex items-center gap-2"
            onMouseEnter={() => setTrafficLightsHovered(true)}
            onMouseLeave={() => setTrafficLightsHovered(false)}
          >
            {/* Close */}
            <motion.button
              className="w-3 h-3 rounded-full flex items-center justify-center relative overflow-hidden group"
              style={{ backgroundColor: isFocused ? '#ff5f57' : 'rgba(255,255,255,0.2)' }}
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              <AnimatePresence>
                {trafficLightsHovered && isFocused && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.1 }}
                    className="text-[8px] font-bold text-black/60"
                  >
                    x
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            {/* Minimize */}
            <motion.button
              className="w-3 h-3 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: isFocused ? '#febc2e' : 'rgba(255,255,255,0.2)' }}
              onClick={handleMinimize}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              <AnimatePresence>
                {trafficLightsHovered && isFocused && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.1 }}
                    className="text-[8px] font-bold text-black/60"
                  >
                    -
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            {/* Maximize */}
            <motion.button
              className="w-3 h-3 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: isFocused ? '#28c840' : 'rgba(255,255,255,0.2)' }}
              onClick={handleMaximize}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              <AnimatePresence>
                {trafficLightsHovered && isFocused && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.1 }}
                    className="text-[8px] font-bold text-black/60"
                  >
                    +
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

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

          {/* Spacer for symmetry */}
          <div className="w-14" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {AppComponent && <AppComponent windowState={windowState} />}
        </div>
      </motion.div>

      {/* Resize Handles (only when not maximized) */}
      {!windowState.isMaximized && (
        <>
          {/* Corners - larger hit areas with subtle visual indicators on hover */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-5 h-5 cursor-se-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute bottom-1 right-1 w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity bg-white rounded-sm" />
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -left-1 w-5 h-5 cursor-sw-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute bottom-1 left-1 w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity bg-white rounded-sm" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 cursor-ne-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute top-1 right-1 w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity bg-white rounded-sm" />
          </motion.div>
          <motion.div
            className="absolute -top-1 -left-1 w-5 h-5 cursor-nw-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute top-1 left-1 w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity bg-white rounded-sm" />
          </motion.div>
          {/* Edges with hover indicators */}
          <div
            className="absolute top-3 bottom-3 -right-1 w-3 cursor-e-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          >
            <div className="absolute inset-y-0 right-1 w-0.5 opacity-0 group-hover:opacity-20 transition-opacity bg-white rounded-full" />
          </div>
          <div
            className="absolute top-3 bottom-3 -left-1 w-3 cursor-w-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          >
            <div className="absolute inset-y-0 left-1 w-0.5 opacity-0 group-hover:opacity-20 transition-opacity bg-white rounded-full" />
          </div>
          <div
            className="absolute -bottom-1 left-3 right-3 h-3 cursor-s-resize group"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          >
            <div className="absolute inset-x-0 bottom-1 h-0.5 opacity-0 group-hover:opacity-20 transition-opacity bg-white rounded-full" />
          </div>
          <div
            className="absolute -top-1 left-3 right-3 h-3 cursor-n-resize group"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          >
            <div className="absolute inset-x-0 top-1 h-0.5 opacity-0 group-hover:opacity-20 transition-opacity bg-white rounded-full" />
          </div>
        </>
      )}
    </motion.div>
  );
}

export default DesktopWindow;
