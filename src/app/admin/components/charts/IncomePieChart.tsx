
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PieChart, Pie, ResponsiveContainer, Legend } from "recharts";



const data = [
  { name: 'Income', value: 60, fill: '#009933' },
  { name: 'Expenses', value: 20, fill: '#ff0000' },
  { name: 'wages', value: 20, fill: '#ff8000' },
];



export function IncomePieChart() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* Content inside the grid */}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-black text-center">Income vs Expenses</CardTitle>
              <CardDescription className="text-center">October Week 1</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
