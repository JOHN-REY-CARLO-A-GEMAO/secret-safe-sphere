
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface AdminStats {
  totalUsers: number;
  totalConfessions: number;
  reportedContent: number;
  activeUsers: number;
  isLoading: boolean;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalConfessions: 0,
    reportedContent: 0,
    activeUsers: 0,
    isLoading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total users count
        const { count: totalUsers, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (usersError) throw usersError;

        // For demonstration purposes, we're setting mock data for other stats
        // In a real app, you would fetch these from their respective tables
        
        // Mock active users (70% of total users for this example)
        const activeUsers = Math.round(totalUsers * 0.7);
        
        setStats({
          totalUsers: totalUsers || 0,
          totalConfessions: 25, // Mock data
          reportedContent: 3,   // Mock data
          activeUsers,
          isLoading: false
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        toast({
          title: "Failed to load stats",
          description: "Couldn't fetch admin dashboard statistics.",
          variant: "destructive",
        });
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};
