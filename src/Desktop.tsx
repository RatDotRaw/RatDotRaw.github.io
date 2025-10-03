import { useEffect, useRef, useState } from "react"
import { useWindowManager } from "./contexts/WindowManagerContext"
import { apps } from "./data/apps"
import DEBackground from "./components/desktop/DEBackground"
import TopBar from "./components/desktop/TopPanel"
import Taskbar from "./components/desktop/Taskbar"
import StartMenu from "./components/desktop/StartMenu"
import DesktopWindow from "./components/desktop/DesktopWindow"

export default function Desktop() {
  const { windows, openApp, activeWindowId } = useWindowManager()
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false)
  const desktopRef = useRef<HTMLDivElement>(null)

  const handleDesktopClick = () => {
    if (isStartMenuOpen) {
      closeStartMenu()
    }
  }

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen)
  }

  const closeStartMenu = () => {
    setIsStartMenuOpen(false)
  }

  useEffect(() => {
    openApp("about-me")
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
          <DesktopWindow
            key={window.id}
            window={window}
            isActive={activeWindowId === window.id}
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
        onStartMenuToggle={toggleStartMenu}
        isStartMenuOpen={isStartMenuOpen} 
      />
    </div>
  )
}
