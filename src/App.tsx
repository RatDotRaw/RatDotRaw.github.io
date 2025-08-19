import React, { useEffect, useRef, useState } from "react"
import { useWindowManager } from "./hooks/useWindowManager"
import DEBackground from "./components/DEBackground"
import Window from "./components/Window"
import TopBar from "./components/TopPanel"
import Taskbar from "./components/Taskbar"
import StartMenu from "./components/StartMenu"
import { apps } from "./data/apps"
import "./styles/main.scss"

const App: React.FC = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const {
    windows,
    activeWindowId,
    addWindow,
    removeWindow,
    minimizeWindow,
    focusWindow,
    dragWindow,
  } = useWindowManager(desktopRef)
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)

  const openApp = (appId: string) => {
    const app = apps.find((a) => a.id === appId)
    if (app) {
      addWindow({
        title: app.name,
        x: 100 + windows.length * 20, // smoll offset
        y: 100 + windows.length * 20,
        width: app.width ? app.width : 400,
        height: app.height ? app.height : 300,
        minimized: false,
        component: app.component,
      })
    }
    setIsStartMenuOpen(false)
  }

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen)
  }

  const closeStartMenu = () => {
    setIsStartMenuOpen(false)
  }

  // close start menu when clicking outside
  const handleDesktopClick = () => {
    if (isStartMenuOpen) {
      closeStartMenu()
    }
  }

  // start info app on component load
  useEffect(() => {
    openApp("hello-world")
  }, [])

  return (
    <div
      className="desktop"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleDesktopClick}
    >
      {/* Background */}
      <DEBackground />

      {/* TopBar */}
      <TopBar />

      {/* Windows */}
      <div
        ref={desktopRef}
        style={{
          position: "relative",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        {windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            isActive={activeWindowId === window.id}
            onFocus={() => focusWindow(window.id)}
            onClose={() => removeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
          />
        ))}
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu apps={apps} onAppLaunch={openApp} onClose={closeStartMenu} />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowFocus={focusWindow}
        onWindowMinimize={minimizeWindow}
        onStartMenuToggle={toggleStartMenu}
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  )
}

export default App
