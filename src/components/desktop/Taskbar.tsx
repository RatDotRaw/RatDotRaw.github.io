import { useEffect, useState } from "preact/hooks";
import type { FunctionComponent } from "preact";
import type { WindowState } from "../../types/types";
import styles from "./Taskbar.module.scss";
import { useWindowManager } from "../../contexts/WindowManagerContext";

interface TaskbarProps {
  windows: WindowState[];
  onStartMenuToggle: (e: MouseEvent) => void;
  isStartMenuOpen: boolean;
}

const Taskbar: FunctionComponent<TaskbarProps> = ({
  windows,
  onStartMenuToggle,
  isStartMenuOpen,
}) => {
  const [time, setTime] = useState<string>();
  const {
    activeWindowId,
    focusWindow,
    minimizeWindow
   } = useWindowManager()

  const taskbarButtonAction = (window: WindowState) => {
    if (activeWindowId == window.id) {
      minimizeWindow(window.id, true)
    } else {
      focusWindow(window.id)
      minimizeWindow(window.id, false)
    }
  }
  
  // set clock
  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour = String(dateObject.getHours()).padStart(2, "0");
      const minute = String(dateObject.getMinutes()).padStart(2, "0");
      // const second = dateObject.getSeconds();

      const currentTime = hour + ":" + minute; // + " : " + second;
      // console.log(currentTime);
      setTime(currentTime);
    }, 1000);
  }, []);

  return (
    <div className={styles.taskBar}>
      {/* Start Button */}
      <button
        type="button"
        onClick={onStartMenuToggle}
        className={styles.startButton}
        style={{
          backgroundColor: isStartMenuOpen ? "#63d0df" : "#00525a",
        }}
      >
        <span style={{ marginRight: "8px" }}>⊞</span>
        <p>Start</p>
      </button>

      {/* window tabs */}
      <div className={styles.windowTabList}>
        {windows.map((window) => (
          <button
            key={window.id}
            type="button"
            onClick={() => taskbarButtonAction(window)}
            className={`${styles.windowTab} ${
              activeWindowId === window.id ? styles.active : styles.inactive
            }`}
          >
            <span
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {window.title}
            </span>
          </button>
        ))}
      </div>
      {/* clock */}
      <div
        style={{
          alignContent: "center",
          marginRight: "8px",
        }}
      >
        {time}
      </div>
    </div>
  );
};

export default Taskbar;
