import React, { useEffect, useState } from "react";
import type { WindowState } from "../types/types";
import styles from "./Taskbar.module.scss";

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onWindowFocus: (id: string) => void;
  onWindowMinimize: (id: string) => void;
  onStartMenuToggle: () => void;
  isStartMenuOpen: boolean;
}

const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onWindowFocus,
  onWindowMinimize,
  onStartMenuToggle,
  isStartMenuOpen,
}) => {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      // const second = dateObject.getSeconds();

      const currentTime = hour + ":" + minute; // + " : " + second;
      console.log(currentTime);
      setTime(currentTime);
    }, 1000);
  }, []);

  return (
    <div className={styles.taskBar}>
      {/* Start Button */}
      <button
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
            onClick={() => {
              if (activeWindowId === window.id) {
                onWindowMinimize(window.id);
              } else {
                onWindowFocus(window.id);
              }
            }}
            className={`${styles.windowTab} ${
              activeWindowId === window.id ? styles.active : styles.inactive
            }`}
          >
            <span
              style={{
                overflow: "hidden",
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
