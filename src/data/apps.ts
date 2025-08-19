import type { AppInfo } from '../types/types';
import HelloWorld from '../components/apps/HelloWorld';
import TallyCounter from '../components/apps/TallyCounter';
import Terminal from '../components/apps/Terminal';

export const apps: AppInfo[] = [
  {
    id: 'hello-world',
    name: 'Hello World',
    icon: '📄',
    width: 600,
    height: 800,
    component: HelloWorld
  },
  {
    id: 'tally-counter',
    name: 'Tally Counter',
    icon: '🔢',
    component: TallyCounter
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '💻',
    component: Terminal
  }
];