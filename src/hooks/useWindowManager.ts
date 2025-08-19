import { useState, useCallback, type RefObject } from "react"
import type { Position, WindowState } from "../types/types"

export const useWindowManager = (
  desktopRef: RefObject<HTMLDivElement | null>
) => {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)

  const minWidth = 200
  const minHeight = 200

  const addWindow = useCallback((windowConfig: Omit<WindowState, "id">) => {
    const id = `window-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
    const newWindow: WindowState = { ...windowConfig, id }

    // resize to fit desktop
    // if (desktopRef.current) {
    //   const bounds = desktopRef.current.getBoundingClientRect();
    // }

    setWindows((prev) => [...prev, newWindow])
    setActiveWindowId(id)

    return id
  }, [])

  const removeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => prev.filter((window) => window.id !== id))
      if (activeWindowId === id) {
        const remainingWindows = windows.filter((window) => window.id !== id)
        setActiveWindowId(
          remainingWindows.length > 0
            ? remainingWindows[remainingWindows.length - 1].id
            : null
        )
      }
    },
    [activeWindowId, windows]
  )

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id ? { ...window, minimized: !window.minimized } : window
      )
    )
  }, [])

  const focusWindow = useCallback((id: string) => {
    setWindows(
      (
        prev // un-minimize window
      ) =>
        prev.map((window) =>
          window.id === id ? { ...window, minimized: false } : window
        )
    )
    setActiveWindowId(id)
  }, [])

  return {
    windows,
    activeWindowId,
    addWindow,
    removeWindow,
    minimizeWindow,
    focusWindow,
  }
}
