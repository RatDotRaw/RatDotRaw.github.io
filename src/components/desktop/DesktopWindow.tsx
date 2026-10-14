import { useState, useRef, useEffect } from "preact/hooks"
import type { ResizeDirection, WindowState } from "../../types/types"
import styles from "./DesktopWindow.module.scss"
import { useWindowManager } from "../../contexts/WindowManagerContext"

const DesktopWindow = ({
  window,
  isActive,
}: {
  window: WindowState
  isActive: boolean
}) => {
  const {
    activeWindowId,
    focusWindow,
    removeWindow,
    minimizeWindow,
    moveWindow,
    resizeWindowByDelta,
  } = useWindowManager()

  const { x, y } = window.position
  const { width, height } = window.size
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState<ResizeDirection>(null)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  // Latest handler stored in a ref so document listeners never go stale
  const handleMouseMoveRef = useRef<(e: MouseEvent) => void>()
  const handleMouseUpRef = useRef<() => void>()

  handleMouseMoveRef.current = (e: MouseEvent) => {
    if (isDragging) {
      moveWindow(window.id, e.clientX - dragStartPos.current.x, e.clientY - dragStartPos.current.y)
    } else if (isResizing) {
      resizeWindowByDelta(window.id, e.clientX - resizeStartPos.current.x, e.clientY - resizeStartPos.current.y, isResizing)
      resizeStartPos.current = { x: e.clientX, y: e.clientY }
    }
  }

  handleMouseUpRef.current = () => {
    setIsDragging(false)
    setIsResizing(null)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      const onMouseMove = (e: MouseEvent) => handleMouseMoveRef.current(e)
      const onMouseUp = () => handleMouseUpRef.current()

      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)

      return () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
      }
    }
  }, [isDragging, isResizing])

  const handleTitleBarMouseDown = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) return
    dragStartPos.current = { x: e.clientX - x, y: e.clientY - y }
    setIsDragging(true)
  }

  const handleResizeMouseDown = (e: MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation()
    resizeStartPos.current = { x: e.clientX, y: e.clientY }
    setIsResizing(direction)
  }

  if (window.minimized) {
    return null
  }

  return (
    <div
      key={window.id}
      ref={windowRef}
      className={`${styles.windowBox} ${
        isActive ? styles.active : styles.inactive
      }`}
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
        zIndex: isActive ? 1 : 0,
      }}
      onMouseDown={() => {
        if (activeWindowId !== window.id) {
          focusWindow(window.id)
        }
      }}
    >
      {/* Title Bar */}
      <div
        className={`${styles.titleBar} ${
          isActive ? styles.active : styles.inactive
        }`}
        onMouseDown={handleTitleBarMouseDown}
      >
        <span>
          <b>{window.title}</b>
        </span>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.windowButton}`}
            onClick={() => minimizeWindow(window.id, true)}
          >
            ─
          </button>
          <button
            className={`${styles.windowButton} ${styles.closeButton}`}
            onClick={() => removeWindow(window.id)}
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className={styles.windowBodyCenter}>
        <div className={`${styles.windowBody}`}>
          <window.component />
        </div>
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
  )
}

export default DesktopWindow
