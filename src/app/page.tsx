'use client' 

import { useState } from 'react';
import {
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

import RealTimeWeather from './admin/components/RealTime';
import { OrdersByDayChart } from './admin/components/charts/OrdersByDayChart';
import './globals.css';
import { Calendar } from '@/components/ui/calendar';
import { UsersByDayChart } from './admin/components/charts/UsersByDayChart';
import WeatherTemp from './admin/components/WeatherTemp';
import { IncomePieChart } from './admin/components/charts/IncomePieChart';
import WeatherWidget from './admin/components/WeatherWidget';
import Image from 'next/image';

import SpotifyWebPlayer from 'react-spotify-web-playback';
import Player from './admin/components/spotify/Player';
import Login from './admin/components/spotify/Login';
import SpotifySearch from './admin/components/spotify/Spotify';
import Dashboard from './admin/components/spotify/Dashboard';
import { BarChart1 } from './admin/components/data/page';


// Define a type for the navigation items

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  count?: string;
  component: React.ComponentType;
};


// Define  navigation and corresponding component mappings

const navigation: NavigationItem[] = [
  { name: 'Sales', href: '', icon: HomeIcon, count: '5', component: () => 
  <div>
    <OrdersByDayChart />
    <UsersByDayChart />
    <IncomePieChart />
  </div>
 },

  
  { name: 'Weather', href: '/components/projects', icon: FolderIcon, count: '12', component: () => 
  <div>
    <WeatherWidget />
    <WeatherTemp />
    </div> 
  },
  { name: 'Spotify', href: '/components/spotify', icon: UsersIcon, component: () => <div>
  <SpotifySearch accessToken={''} />
  <Login />
  
  <SpotifyWebPlayer token={''} uris={''} />
  
  <Player accessToken={undefined} trackUri={undefined} />
  
  </div> },
  { name: 'General data', href: '/components/data', icon: DocumentDuplicateIcon, component: () => 
  <div><BarChart1 /></div> },
  
];

const teams = [
  { id: 1, name: 'Option1', href: '#', initial: 'H' },
  { id: 2, name: 'Option2', href: '#', initial: 'T' },
  { id: 3, name: 'Option3', href: '#', initial: 'W' },
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

          <Image
            className="h-14 w-14 mt-10 ml-5"
            src="/terrier.png"
            alt="Your Company"
            width={100}
            height={100}
          />
          
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
            <Calendar />
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
                    className="flex mb-12 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <Image
                      className=" rounded-full bg-gray-800"
                      src="/avatar.jpeg"
                      width={70}
                      height={70}
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Kostas Diam</span>
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



