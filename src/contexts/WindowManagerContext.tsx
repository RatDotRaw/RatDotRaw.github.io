import {
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from "react"
import type { ResizeDirection, WindowState } from "../types/types"
import { apps } from "../data/apps"

type WindowManagerContextType = {
  windows: WindowState[]
  activeWindowId: string | null
  openApp: (appId: string) => void
  addWindow: (config: Omit<WindowState, "id">) => string
  removeWindow: (id: string) => void
  focusWindow: (id: string) => void
  moveWindow: (id: string, x: number, y: number) => void
  minimizeWindow: (id: string, minimize: boolean) => void
  resizeWindow: (id: string, width: number, height: number) => void
  resizeWindowByDelta: (id: string, width: number, height: number, direction: ResizeDirection) => void
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(
  null
)

// A provider component
export const WindowManagerProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  // Paste your current useWindowManager logic here, but return the object directly
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)

  // Minimum window size
  const minWidth = 300
  const minHeight = 200

  const openApp = (appId: string) => {
    const app = apps.find((a) => a.id === appId)
    if (app) {
      addWindow({
        title: app.name,
        position: {
          x: 100 + windows.length * 20, // smoll offset
          y: 100 + windows.length * 20,
        },
        size: app.size ? app.size : { width: 400, height: 300 },
        minimized: false,
        component: app.component,
      })
    }
  }

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

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id)
    setWindows((prev) =>
      prev.map((window) =>
      window.id === id
        ? { ...window, minimized: false }
        : window
      )
    )
  }, [setActiveWindowId])

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((window) =>
        window.id === id
          ? {
              ...window,
              position: {
                x: x,
                y: y>= 0? y : 0,
              }
            }
          : window
        )
      )
    setActiveWindowId(id)
  }, [])

  const minimizeWindow = useCallback((id: string, minimize: boolean) => {
    setWindows((prev) =>
      prev.map((window) => {
        if (window.id === id) {
          window.minimized = minimize
          if (minimize) {
            setActiveWindowId(null)
          }
        }
        
        return window
      } ))
  }, [])

  const resizeWindow = useCallback(
    (id: string, width: number, height: number) => {
      width = width < minWidth ? minWidth : width
      height = height < minHeight ? minHeight : height
      console.log("firing")

      setWindows((prev) =>
        prev.map((window) =>
          window.id === id
            ? {
                ...window,
                size: {
                  width,
                  height,
                }
              }
            : window
        )
      )
    },
    []
  )

  const resizeWindowByDelta = useCallback(
    (
      id: string,
      deltaX: number,
      deltaY: number,
      direction: ResizeDirection
    ) => {
      setWindows((prev) =>
        prev.map((win) => {
          if (win.id !== id) return win

          const { x, y } = win.position
          const { width, height } = win.size

          const minWidth = 200
          const minHeight = 200

          let newX = x
          let newY = y
          let newWidth = width
          let newHeight = height

          switch (direction) {
            case "n":
              newY = y + deltaY
              newHeight = Math.max(minHeight, height - deltaY)
              break
            case "ne":
              newY = y + deltaY
              newWidth = Math.max(minWidth, width + deltaX)
              newHeight = Math.max(minHeight, height - deltaY)
              break
            case "e":
              newWidth = Math.max(minWidth, width + deltaX)
              break
            case "se":
              newWidth = Math.max(minWidth, width + deltaX)
              newHeight = Math.max(minHeight, height + deltaY)
              break
            case "s":
              newHeight = Math.max(minHeight, height + deltaY)
              break
            case "sw":
              newX = x + deltaX
              newWidth = Math.max(minWidth, width - deltaX)
              newHeight = Math.max(minHeight, height + deltaY)
              break
            case "w":
              newX = x + deltaX
              newWidth = Math.max(minWidth, width - deltaX)
              break
            case "nw":
              newX = x + deltaX
              newY = y + deltaY
              newWidth = Math.max(minWidth, width - deltaX)
              newHeight = Math.max(minHeight, height - deltaY)
              break
            default:
              return win
          }

          return {
            ...win,
            position: { x: newX, y: newY },
            size: { width: newWidth, height: newHeight },
          }
        })
      )
    },
    []
  )

  const value = {
    windows,
    activeWindowId,
    openApp,
    addWindow,
    removeWindow,
    focusWindow,
    moveWindow,
    minimizeWindow,
    resizeWindow,
    resizeWindowByDelta
  }

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}

// custom hook for easy access to WindowManagerContext
export const useWindowManager = () => {
  const context = useContext(WindowManagerContext)
  if (!context) {
    throw new Error(
      "useWindowManager must be used within WindowManagerProvider"
    )
  }
  return context
}
