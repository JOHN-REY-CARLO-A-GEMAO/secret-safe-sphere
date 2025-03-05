
import React from 'react';
import { Users, BarChart2, Shield, AlertCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { AdminStats } from '@/hooks/use-admin-stats';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface StatsSectionProps {
  stats: AdminStats;
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <>
      {stats.error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            There was an error loading live statistics. Showing estimated data.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          icon={<Users size={24} />} 
          title="Total Users" 
          value={stats.totalUsers} 
          isLoading={stats.isLoading}
        />
        <StatsCard 
          icon={<Shield size={24} />} 
          title="Total Confessions" 
          value={stats.totalConfessions} 
          isLoading={stats.isLoading}
        />
        <StatsCard 
          icon={<AlertCircle size={24} />} 
          title="Reported Content" 
          value={stats.reportedContent} 
          isLoading={stats.isLoading}
        />
        <StatsCard 
          icon={<BarChart2 size={24} />} 
          title="Active Users" 
          value={stats.activeUsers} 
          isLoading={stats.isLoading}
        />
      </div>
    </>
  );
};
