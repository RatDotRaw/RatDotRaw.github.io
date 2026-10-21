import type { FunctionComponent, TargetedKeyboardEvent } from "preact";
import type { AppInfo } from "../../types/types.ts";
import styles from "./StartMenu.module.scss";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

interface StartMenuProps {
  apps: AppInfo[];
  onAppLaunch: (appId: string) => void;
  onClose: () => void;
}

const isImage = (icon: string) => icon.startsWith("/");

const StartMenu: FunctionComponent<StartMenuProps> = ({
  apps,
  onAppLaunch,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return apps;
    return apps.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q)
    );
  }, [apps, query]);

  // start typing right away
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // auto select entry 0 when typing
  useEffect(() => {
    setSelected(0);
  }, [query]);

  // keep selection item in view
  useEffect(() => {
    itemRefs.current[selected]?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const handleKeyDown = (e: TargetedKeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelected((current) => (
          filtered.length ? (current + 1) % filtered.length : 0)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelected((current) =>
          filtered.length ? (current - 1 + filtered.length) % filtered.length : 0
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[selected]) onAppLaunch(filtered[selected].id);
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  return (
    <div className={styles.startMenu} onClick={(e) => e.stopPropagation()}>
      {/* Start Menu Header */}
      <div className={styles.header}>App launcher</div>

      {/* Search */}
      <input
        ref={inputRef}
        type="search"
        placeholder="> Search for ..."
        onInput={(e) => setQuery(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />

      {/* App List */}
      <div className={styles.appList}>
        {filtered.length === 0 && (
          <p className={styles.emptyState}>Nothing found for "{query}"</p>
        )}
        {filtered.map((app, i) => (
          <div
            key={app.id}
            ref={(el) => {
              // For scolling into view
              itemRefs.current[i] = el;
            }}
            className={`${styles.appItem} ${i === selected ? styles.selected : ""}`}
            onMouseEnter={() => setSelected(i)}
            onClick={() => onAppLaunch(app.id)}
          >
            <span className={styles.appIcon}>
              {isImage(app.icon) ? <img src={app.icon} alt="" /> : app.icon}
            </span>
            <span className={styles.appText}>
              <span className={styles.appName}>{app.name}</span>
              {app.description && (
                <span className={styles.appDescription}>{app.description}</span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div>
        {/* TODO: finish navigation hints */}
        Cool navigation with arrows is possible
      </div>
    </div>
  );
};

export default StartMenu;
