'use client';

import React, { useState, useEffect } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Papa from 'papaparse';

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

interface AggregatedData {
  date: string;
  value: number;
}

type DataType = 'Nationality' | 'Age' | 'Gender' | 'Ethnicity' ;

function aggregateData(data: any[], dataType: DataType): AggregatedData[] {
  const aggregated: Record<string, number> = {};

  data.forEach(item => {
    let key;
    switch (dataType) {
      case 'Age':
        key = item['Age'];
        break;
      case 'Gender':
        key = item['Gender'];
        break;
      case 'Age':
        key = item['Age'];
        break;
        case 'Ethnicity':
        key = item['Ethnicity'];
        break;
      case 'Nationality':
        key = item['Nationality'];
        break;
      default:
        key = new Date(item['Event Date/Time']).toISOString().split('T')[0]; // Extract the date part
        break;
    }

    if (!aggregated[key]) {
      aggregated[key] = 0;
    }
    aggregated[key] += 1;
  });

  return Object.keys(aggregated).map(key => ({
    date: key,
    value: aggregated[key],
  }));
}

export function BarChart1() {
  const [data, setData] = useState<AggregatedData[]>([]);
  const [dataType, setDataType] = useState<DataType>('Nationality');
  const [activeIndex, setActiveIndex] = useState<number | null>(-1);

  useEffect(() => {
    fetch('/Police_Arrests.csv')
      .then(response => response.text())
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const aggregatedData = aggregateData(result.data, dataType);
            setData(aggregatedData);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching the CSV file', error);
      });
  }, [dataType]); // Refetch data when dataType changes

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
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
              <CardTitle className="text-black text-center">Police Arrests in Montgomery County 2021-2023</CardTitle>
              <CardDescription className="text-center">Select Data Type</CardDescription>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value as DataType)}
                className="mb-4"
              >
                <option value="Total Users">Total Suspects</option>
                <option value="Age">Age</option>
                <option value="Gender">Gender</option>
                <option value="Nationality">Nationality</option>
              </select>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" minHeight={300}>
                <BarChart data={data}>
                  <CartesianGrid stroke="hsl(var(--muted))" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip formatter={(value) => formatNumber(value as number)} />
                  <Bar
                    dataKey="value"
                    name="Total"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === activeIndex
                            ? colors[index % colors.length]
                            : colors[index % colors.length]
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


