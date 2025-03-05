
import React from 'react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const StatsCard = ({ icon, title, value }: StatsCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className="p-2 bg-primary-foreground rounded-lg mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
};
