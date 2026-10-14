import { WindowManagerProvider } from './contexts/WindowManagerContext'
import Desktop from './Desktop'
import "./styles/main.scss"

export function App() {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  )
}
