import React, { useState, useRef, useEffect } from "react";
import type { WindowState } from "../types/types";
import styles from "./Window.module.scss";

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
}

const Window: React.FC<WindowProps> = ({
  window,
  isActive,
  onFocus,
  onClose,
  onMinimize,
}) => {
  const [position, setPosition] = useState({ x: window.x, y: window.y });
  const [size, setSize] = useState({ x: window.width, y: window.height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<ResizeDirection>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Focus window when clicked
  const handleMouseDown = () => {
    onFocus();
  };

  // Drag functionality
  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;

    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setIsDragging(true);
    onFocus();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    } else if (isResizing) {
      // Minimum window size
      const minWidth = 300;
      const minHeight = 200;

      const deltaX = e.clientX - resizeStartPos.current.x;
      const deltaY = e.clientY - resizeStartPos.current.y;

      switch (isResizing) {
        case "n":
          setPosition({
            ...position,
            y: position.y + deltaY,
          });
          setSize({
            ...size,
            y: size.y - deltaY,
          });
          break;
        case "ne":
          setPosition({
            ...position,
            y: position.y + deltaY,
          });
          setPosition({
            x: size.x + deltaX,
            y: size.y - deltaY,
          });
          break;
        case "e":
          setSize({
            ...size,
            x: size.x + deltaX,
          });
          break;
        case "se":
          setSize({
            x: size.x + deltaX,
            y: size.y + deltaY,
          });
          break;
        case "s":
          setSize({
            ...size,
            y: size.y + deltaY,
          });
          break;
        case "sw":
          setPosition({
            ...position,
            x: position.x + deltaX,
          });
          setSize({
            x: size.x - deltaX,
            y: size.y + deltaY,
          });
          break;
        case "w":
          setPosition({
            ...position,
            x: position.x + deltaX,
          });
          setSize({
            ...size,
            x: size.x - deltaX,
          });
          break;
        case "nw":
          setPosition({
            x: position.x + deltaX,
            y: position.y + deltaY,
          });
          setSize({
            x: size.x - deltaX,
            y: size.y - deltaY,
          });
          break;
      }
      setSize((prevSize) => ({
        x: prevSize.x < minWidth ? minWidth : prevSize.x,
        y: prevSize.y < minHeight ? minHeight : prevSize.y,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(null);
  };

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    direction: ResizeDirection
  ) => {
    e.stopPropagation();
    resizeStartPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
    setIsResizing(direction);
    onFocus();
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // cleanup func
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing]);

  if (window.minimized) {
    return null;
  }

  const AppComponent = window.component;

  return (
    <div
      ref={windowRef}
      className={`${styles.windowBox} ${
        isActive ? styles.active : styles.inactive
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.x,
        height: size.y,
        zIndex: isActive ? 1 : 0,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Title Bar */}
      <div
        className={`${styles.titleBar} ${
          isActive ? styles.active : styles.inactive
        }`}
        onMouseDown={handleTitleBarMouseDown}
      >
        <span><b>{window.title}</b></span>
        <div className={styles.buttonContainer}>
          <button className={`${styles.windowButton}`} onClick={onMinimize}>
            ─
          </button>
          <button
            className={`${styles.windowButton} ${styles.closeButton}`}
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className={`${styles.windowBody}`}>
        <AppComponent />
      </div>

      {/* Resize Handles */}
      <div
        className={`${styles.resizeHandle} ${styles.n}`}
        onMouseDown={(e) => handleResizeMouseDown(e, "n")}
      />
      <div
        className={`${styles.resizeHandle} ${styles.s}`}
        onMouseDown={(e) => handleResizeMouseDown(e, "s")}
      />
      <div
        className={`${styles.resizeHandle} ${styles.e}`}
        onMouseDown={(e) => handleResizeMouseDown(e, "e")}
      />
      <div
        className={`${styles.resizeHandle} ${styles.w}`}
        onMouseDown={(e) => handleResizeMouseDown(e, "w")}
      />
      <div
        className={`${styles.resizeHandle} ${styles.ne}`}
        onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
      />
      <div
        className={`${styles.resizeHandle} ${styles.nw}`}
        onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
      />
      <div
        className={`${styles.resizeHandle} ${styles.se}`}
        onMouseDown={(e) => handleResizeMouseDown(e, "se")}
      />
      <div
        className={`${styles.resizeHandle} ${styles.sw}`}
        onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
      />
    </div>
  );
};

export default Window;
