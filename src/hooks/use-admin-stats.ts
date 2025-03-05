
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface AdminStats {
  totalUsers: number;
  totalConfessions: number;
  reportedContent: number;
  activeUsers: number;
  isLoading: boolean;
  error: Error | null;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalConfessions: 0,
    reportedContent: 0,
    activeUsers: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total users count
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (error) throw error;

        // For demonstration purposes, we're setting mock data for other stats
        // In a real app, you would fetch these from their respective tables
        
        // Mock active users (70% of total users for this example)
        const activeUsers = Math.round((count || 0) * 0.7);
        
        setStats({
          totalUsers: count || 0,
          totalConfessions: 25, // Mock data
          reportedContent: 3,   // Mock data
          activeUsers,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        
        // Set fallback values with error state
        setStats({
          totalUsers: 0,
          totalConfessions: 0,
          reportedContent: 0,
          activeUsers: 0,
          isLoading: false,
          error: error instanceof Error ? error : new Error('Failed to fetch stats')
        });
        
        toast({
          title: "Failed to load stats",
          description: "Couldn't fetch admin dashboard statistics. Using default values.",
          variant: "destructive",
        });
      }
    };

    fetchStats();
  }, []);

  return stats;
};
