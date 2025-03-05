
import React from 'react';
import { Users, BarChart2, Shield, AlertCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { AdminStats } from '@/hooks/use-admin-stats';

interface StatsSectionProps {
  stats: AdminStats;
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard 
        icon={<Users size={24} />} 
        title="Total Users" 
        value={stats.totalUsers.toString()} 
      />
      <StatsCard 
        icon={<Shield size={24} />} 
        title="Total Confessions" 
        value={stats.totalConfessions.toString()} 
      />
      <StatsCard 
        icon={<AlertCircle size={24} />} 
        title="Reported Content" 
        value={stats.reportedContent.toString()} 
      />
      <StatsCard 
        icon={<BarChart2 size={24} />} 
        title="Active Users" 
        value={stats.activeUsers.toString()} 
      />
    </div>
  );
};
