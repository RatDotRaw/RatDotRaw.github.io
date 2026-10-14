import type { AppInfo } from '../types/types.ts';
import About from '../components/apps/About.tsx';
import HelloWorld from '../components/apps/HelloWorld.tsx';
import TallyCounter from '../components/apps/TallyCounter.tsx';
import Terminal from '../components/apps/Terminal.tsx';

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