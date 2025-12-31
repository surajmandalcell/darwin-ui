"use client";

import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useDragControls, type PanInfo } from 'framer-motion';
import { useDesktop, type WindowState, type AppDefinition } from '../../contexts/desktop-context';

// Import app components
import { DeveloperApp } from './apps/DeveloperApp';
import { ComponentsApp } from './apps/ComponentsApp';
import { TerminalApp } from './apps/TerminalApp';
import { NotesApp } from './apps/NotesApp';
import { PreviewApp } from './apps/PreviewApp';
import { SettingsApp } from './apps/SettingsApp';

interface DesktopWindowProps {
  windowState: WindowState;
  appDef: AppDefinition;
  isFocused: boolean;
}

// Map app IDs to components
const appComponents: Record<string, React.ComponentType<{ windowState: WindowState }>> = {
  developer: DeveloperApp,
  components: ComponentsApp,
  terminal: TerminalApp,
  notes: NotesApp,
  preview: PreviewApp,
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

  // Get the app component
  const AppComponent = appComponents[windowState.appId];

  // Handle drag end
  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      const newX = windowState.position.x + info.offset.x;
      const newY = windowState.position.y + info.offset.y;

      // Constrain to viewport
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      const minY = 28; // Below menu bar

      updateWindowPosition(windowState.id, {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(minY, Math.min(newY, maxY)),
      });
    },
    [windowState.id, windowState.position, updateWindowPosition]
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
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      }}
      onClick={() => focusWindow(windowState.id)}
    >
      {/* Window Frame */}
      <div
        className={`w-full h-full rounded-xl overflow-hidden flex flex-col transition-shadow duration-200 ${
          isFocused
            ? 'shadow-lg shadow-black/50'
            : 'shadow-md shadow-black/30'
        }`}
        style={{
          background: 'rgb(23 23 23 / 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${isFocused ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
        }}
      >
        {/* Title Bar */}
        <motion.div
          className="flex items-center h-9 px-3 bg-black/20 border-b border-white/10 cursor-default select-none shrink-0"
          drag={!windowState.isMaximized}
          dragControls={dragControls}
          dragMomentum={false}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          onDoubleClick={handleMaximize}
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 group">
            {/* Close */}
            <button
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all flex items-center justify-center"
              onClick={handleClose}
            >
              <svg className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
                <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Minimize */}
            <button
              className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all flex items-center justify-center"
              onClick={handleMinimize}
            >
              <svg className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
                <path d="M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {/* Maximize */}
            <button
              className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all flex items-center justify-center"
              onClick={handleMaximize}
            >
              <svg className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
                {windowState.isMaximized ? (
                  <path d="M3 7V3h4M7 3v4H3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                ) : (
                  <path d="M1 3.5L5 0l4 3.5M5 0v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" transform="rotate(45 5 5)"/>
                )}
              </svg>
            </button>
          </div>

          {/* Title */}
          <div className="flex-1 text-center">
            <span className="text-[13px] font-medium text-white/70">
              {windowState.title}
            </span>
          </div>

          {/* Spacer for symmetry */}
          <div className="w-14" />
        </motion.div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {AppComponent && <AppComponent windowState={windowState} />}
        </div>
      </div>

      {/* Resize Handles (only when not maximized) */}
      {!windowState.isMaximized && (
        <>
          {/* Corners */}
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          <div
            className="absolute -bottom-1 -left-1 w-4 h-4 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
          <div
            className="absolute -top-1 -right-1 w-4 h-4 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
          />
          <div
            className="absolute -top-1 -left-1 w-4 h-4 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
          />
          {/* Edges */}
          <div
            className="absolute top-2 bottom-2 -right-1 w-2 cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          <div
            className="absolute top-2 bottom-2 -left-1 w-2 cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          <div
            className="absolute -bottom-1 left-2 right-2 h-2 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          <div
            className="absolute -top-1 left-2 right-2 h-2 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, 'n')}
          />
        </>
      )}
    </motion.div>
  );
}

export default DesktopWindow;
