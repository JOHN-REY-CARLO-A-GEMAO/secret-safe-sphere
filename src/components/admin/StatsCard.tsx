
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  isLoading?: boolean;
}

export const StatsCard = ({ icon, title, value, isLoading = false }: StatsCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className="p-2 bg-primary-foreground rounded-lg mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <p className="text-2xl font-bold">{value !== null && value !== undefined ? value : '0'}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
