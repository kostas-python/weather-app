'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

const data = [
  { value: 12, returns: 2, date: '1-10' },
  { value: 20, returns: 5,date: '2-10' },
  { value: 15, returns: 3,date: '3-10' },
  { value: 2,  returns: 7,date:  '4-10' },
  { value: 8,  returns: 1,date:  '5-10' },
  { value: 18, returns: 5,date:  '6-10' },
  { value: 15, returns: 2,date:  '7-10' },
];

const formatCurrency = (tick: number | bigint) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(tick);
};



export function OrdersByDayChart() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* Content inside the grid */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-black text-center">Total Sales</CardTitle>
              <CardDescription className="text-center">October Week 1</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" minHeight={300}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 2 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" name="Total Sales" />
                  <Line type="monotone" dataKey="returns" stroke="#ff4d4d" name="Returns" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
