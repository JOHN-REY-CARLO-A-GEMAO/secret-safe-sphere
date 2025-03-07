
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, RefreshCw } from 'lucide-react';
import { Confession } from '@/types';
import { ConfessionItem } from '../ConfessionItem';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export const ConfessionsTab = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchConfessions = () => {
    setIsLoading(true);
    setError(null);
    
    // Try to get confessions from localStorage
    try {
      const savedConfessions = localStorage.getItem('confessions');
      if (savedConfessions) {
        const parsedConfessions = JSON.parse(savedConfessions);
        setConfessions(parsedConfessions);
        console.log('Fetched confessions:', parsedConfessions);
      } else {
        setConfessions([]);
        console.log('No confessions found in localStorage');
      }
    } catch (err) {
      console.error('Error fetching confessions:', err);
      setError(err instanceof Error ? err : new Error('Failed to load confessions'));
      toast({
        title: "Error loading confessions",
        description: "There was a problem loading the confessions data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  const handleDeleteConfession = (id: string) => {
    try {
      // Remove the confession from the state
      const updatedConfessions = confessions.filter(confession => confession.id !== id);
      setConfessions(updatedConfessions);
      
      // Update localStorage
      localStorage.setItem('confessions', JSON.stringify(updatedConfessions));
      
      toast({
        title: "Confession deleted",
        description: "The confession has been removed successfully.",
        variant: "default"
      });
    } catch (err) {
      console.error('Error deleting confession:', err);
      toast({
        title: "Error deleting confession",
        description: "There was a problem removing the confession.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Confession Management</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={fetchConfessions}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <p className="text-gray-500 mb-4">Review and moderate confessions</p>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Failed to load confessions. Please try refreshing.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : confessions.length > 0 ? (
        <div className="space-y-4">
          {confessions.map((confession) => (
            <ConfessionItem 
              key={confession.id} 
              confession={confession} 
              onDelete={handleDeleteConfession}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Confessions Found</h3>
            <p className="text-sm text-gray-500 mb-4">
              There are no confessions to display at this time
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
