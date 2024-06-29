'use client';

import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

const data = [
  { value: 12, date: '10-10' },
  { value: 20, date: '11-10' },
  { value: 15, date: '12-10' },
  { value: 2, date: '13-10' },
  { value: 8, date: '14-10' },
];

export function OrdersByDayChart() {
  return (
    <ResponsiveContainer width="100%" minHeight={300} >
    <LineChart  data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line dataKey="value" stroke="#8884d8" name="Total Sales" />
    </LineChart>
    </ResponsiveContainer>
  );
}
