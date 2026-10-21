import type { AppInfo } from '../types/types.ts';
import About from '../components/apps/About.tsx';
import HelloWorld from '../components/apps/HelloWorld.tsx';
import TallyCounter from '../components/apps/TallyCounter.tsx';
import Terminal from '../components/apps/Terminal.tsx';

export const apps: AppInfo[] = [
  {
    id: 'about-me',
    name: 'About me',
    icon: '/cropped.png',
    description: 'Who is this guy? Skills, links & more',
    size: {
      width: 920,
      height: 800
    },
    component: About
  },
  {
    id: 'HelloWorld',
    name: 'Hello World',
    icon: '📄',
    description: 'The demo app for testing floating windows',
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
    description: 'Count things. That\'s it.',
    component: TallyCounter
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: '💻',
    description: 'A tiny shell. Type "help"',
    component: Terminal
  }
];