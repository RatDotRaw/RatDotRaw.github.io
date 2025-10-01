export interface Position {
  x: number;
  y: number;
}

export interface WindowState {
    id: string;
    title: string;
    position: { x: number, y: number};
    size: { width: number, height: number};
    minimized: boolean;
    component: React.ComponentType;
}

export interface AppInfo {
    id: string;
    name: string;
    icon: string;
    size?: { width: number, height: number}
    customWindow?: boolean,
    component: React.ComponentType;
}

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null