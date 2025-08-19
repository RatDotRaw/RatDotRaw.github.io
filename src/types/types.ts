export interface Position {
  x: number;
  y: number;
}

export interface WindowState {
    id: string;
    title: string;
    x: number;
    y: number;
    width: number;
    height: number;
    minimized: boolean;
    component: React.ComponentType;
}

export interface AppInfo {
    id: string;
    name: string;
    icon: string;
    width?: number;
    height?: number;
    component: React.ComponentType;
}
