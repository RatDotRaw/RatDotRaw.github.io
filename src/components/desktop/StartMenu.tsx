import React from "react";
import type { AppInfo } from "../types/types";
import styles from "./StartMenu.module.scss";

interface StartMenuProps {
  apps: AppInfo[];
  onAppLaunch: (appId: string) => void;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({
  apps,
  onAppLaunch,
  // onClose,
}) => {
  return (
    <div className={styles.startMenu} onClick={(e) => e.stopPropagation()}>
      {/* Start Menu Header */}
      <div className={styles.header}>Start</div>

      {/* App List */}
      <div className={styles.appList}>
        {apps.map((app) => (
          <div
            key={app.id}
            className={styles.appItem}
            onClick={() => onAppLaunch(app.id)}
          >
            <span>{app.icon}</span>
            <span style={{ fontSize: "14px" }}>{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartMenu;
