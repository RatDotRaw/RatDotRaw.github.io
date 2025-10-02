import type { AppInfo } from '../types/types';
import About from '../components/apps/About';
import HelloWorld from '../components/apps/HelloWorld';
import TallyCounter from '../components/apps/TallyCounter';
import Terminal from '../components/apps/Terminal';

export const apps: AppInfo[] = [
  {
    id: 'about-me',
    name: 'About me',
    icon: 'huh?',
    size: {
      width: 650,
      height: 800
    },
    component: About
  },
  {
    id: 'HelloWorld',
    name: 'Hello World',
    icon: '📄',
    // size: {
    //   width: 600,
    //   height: 800,
    // },
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