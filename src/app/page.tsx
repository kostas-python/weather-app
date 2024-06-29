'use client' 
import { useState } from 'react';
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import Team from './components/Team';
import Projects from './components/Projects';
import RealTimeWeather from './components/RealTime';
import { OrdersByDayChart } from './components/Dashboard';
import './globals.css';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';


// Define a type for the navigation items
type NavigationItem = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count?: string;
  component: React.ComponentType;
};

// Define your navigation and corresponding component mappings
const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/components/dashboard', icon: HomeIcon, count: '5', component: () =>
  <>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols3 gap-4 mt-8">
  </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <Card>
      <CardHeader>
        <CardTitle className="text-black text-center">Total Sales</CardTitle>
        <CardDescription className="text-center">October</CardDescription>
      </CardHeader>
      <CardContent>
        <OrdersByDayChart />
      </CardContent>
    </Card>
    </div>
  </>
 },

  { name: 'Team', href: '/components/team', icon: UsersIcon, component: () => <div><Team /></div> },
  { name: 'Projects', href: '/components/projects', icon: FolderIcon, count: '12', component: () => <div><Projects /></div> },
  { name: 'Calendar', href: '#', icon: CalendarIcon, count: '20+', component: () => <div>Calendar Content</div> },
  { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, component: () => <div><RealTimeWeather /></div> },
  { name: 'Reports', href: '#', icon: ChartPieIcon, component: () => <div>Reports Content</div> },
];

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H' },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T' },
  { id: 3, name: 'Workcation', href: '#', initial: 'W' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Home1() {
  const [selectedNavItem, setSelectedNavItem] = useState<NavigationItem>(navigation[0]);

  const handleNavigationClick = (item: NavigationItem) => {
    setSelectedNavItem(item);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex flex-col w-1/4 bg-indigo-950 divide-y divide-double ">
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
           <img
              className="h-14 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
           {/* <svg viewBox="0 0 926 676" aria-hidden="true" className="absolute left-24 w-[57.875rem] transform-gpu blur-[118px]">
        <path fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)" fill-opacity=".4" d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z" />
        <defs>
          <linearGradient id="60c3c621-93e0-4a09-a0e6-4c228a0116d8" x1="926.392" x2="-109.635" y1=".176" y2="321.024" gradientUnits="userSpaceOnUse">
            <stop stop-color="#776FFF" />
            <stop offset="1" stop-color="#FF4694" />
          </linearGradient>
        </defs>
      </svg>*/}
          <ul className="flex flex-col gap-y-5 mt-20">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item === selectedNavItem ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                    'group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigationClick(item);
                  }}
                >
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                  {item.name}
                  {item.count && (
                    <span className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700">
                      {item.count}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Teams */}
        <div className="mt-auto">
          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
          <ul className="mt-2 space-y-1">
            {teams.map((team) => (
              <li key={team.name}>
                <a
                  href={team.href}
                  className="group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                    {team.initial}
                  </span>
                  <span className="truncate">{team.name}</span>
                </a>
              </li>
            ))}
            <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex mb-20 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white p-6">
        {/* Render the selected component */}
        {React.createElement(selectedNavItem.component)}
      </div>
    </div>
  );
}



