
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { AdminLoadingState } from './AdminLoadingState';

interface AuthCheckProps {
  children: React.ReactNode;
}

export const AuthCheck = ({ children }: AuthCheckProps) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { user, profile, isLoading } = authState;
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You need to sign in to access this page.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      if (profile?.role !== 'admin') {
        toast({
          title: "Access Denied",
          description: "You don't have permission to view this page.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsAuthorized(true);
    }
  }, [user, profile, isLoading, navigate]);

  if (isLoading) {
    return <AdminLoadingState />;
  }

  if (isAuthorized === null) {
    return <AdminLoadingState />;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};
