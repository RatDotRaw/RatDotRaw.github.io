import { WindowManagerProvider } from "./contexts/WindowManagerContext"
import Desktop from "./Desktop"
import "./styles/main.scss"


const App: React.FC = () => {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  )
}

export default App
