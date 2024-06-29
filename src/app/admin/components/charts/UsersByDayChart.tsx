'use client';

import React, { useState } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';


// number of users //

const data = [
  { value: 30, date: '2024-01-01' },
  { value: 45, date: '2024-01-02' },
  { value: 28, date: '2024-01-03' },
  { value: 50, date: '2024-01-04' },
  { value: 75, date: '2024-01-05' },
  { value: 33, date: '2024-01-06' },
  { value: 60, date: '2024-01-07' },
];

// bar colors //

const colors = [
  '#8884d8', // Color for first bar
  '#82ca9d', // Color for second bar
  '#ffc658', // Color for third bar
  '#ff8042', // Color for fourth bar
  '#8dd1e1', // Color for fifth bar
  '#a4de6c', // Color for sixth bar
  '#d0ed57', // Color for seventh bar
];


function formatNumber(value: number): string {
  return value.toString();
}


export function UsersByDayChart() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };


  const handleMouseLeave = () => {
    setActiveIndex(-1);
  };

  

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* Content inside the grid */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-black text-center">Total Users</CardTitle>
              <CardDescription className="text-center">October Week 1</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" minHeight={300}>
                <BarChart data={data}>
                  <CartesianGrid stroke="hsl(var(--muted))" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip
                    formatter={(value) => formatNumber(value as number)}
                  />
                  <Bar
                    dataKey="value"
                    name="New Users"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === activeIndex
                            ? colors[index % colors.length] 
                            : colors[index % colors.length] // Default color
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
