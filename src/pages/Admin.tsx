import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BarChart2, Shield, Settings, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminStats } from '@/hooks/use-admin-stats';

const AdminDashboard = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { user, profile, isLoading } = authState;
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const adminStats = useAdminStats();

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

  if (isLoading || adminStats.isLoading) {
    return <LoadingState />;
  }

  if (isAuthorized === null) {
    return <LoadingState />;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your Whisperspace community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            icon={<Users size={24} />} 
            title="Total Users" 
            value={adminStats.totalUsers.toString()} 
          />
          <StatsCard 
            icon={<Shield size={24} />} 
            title="Total Confessions" 
            value={adminStats.totalConfessions.toString()} 
          />
          <StatsCard 
            icon={<AlertCircle size={24} />} 
            title="Reported Content" 
            value={adminStats.reportedContent.toString()} 
          />
          <StatsCard 
            icon={<BarChart2 size={24} />} 
            title="Active Users" 
            value={adminStats.activeUsers.toString()} 
          />
        </div>

        <Tabs defaultValue="users">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="confessions">Confessions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <p className="text-gray-500 mb-4">View and manage user accounts</p>
              <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">User List</h3>
                  <p className="text-sm text-gray-500 mb-4">User management will be implemented soon</p>
                  <Button variant="outline" disabled>View Users</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="confessions" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Confession Management</h2>
              <p className="text-gray-500 mb-4">Review and moderate confessions</p>
              <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Confession List</h3>
                  <p className="text-sm text-gray-500 mb-4">Confession management will be implemented soon</p>
                  <Button variant="outline" disabled>View Confessions</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Report Management</h2>
              <p className="text-gray-500 mb-4">Review reported content</p>
              <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Report List</h3>
                  <p className="text-sm text-gray-500 mb-4">Report management will be implemented soon</p>
                  <Button variant="outline" disabled>View Reports</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
              <p className="text-gray-500 mb-4">Configure admin dashboard settings</p>
              <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
                <div className="text-center">
                  <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Settings</h3>
                  <p className="text-sm text-gray-500 mb-4">Admin settings will be implemented soon</p>
                  <Button variant="outline" disabled>Update Settings</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <Skeleton className="h-10 w-3/12 mb-2" />
          <Skeleton className="h-5 w-4/12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="p-6">
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-lg mr-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-10" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Skeleton className="h-10 w-[400px] mb-6" />
        
        <Card className="p-6">
          <Skeleton className="h-7 w-1/4 mb-4" />
          <Skeleton className="h-4 w-2/4 mb-8" />
          <div className="bg-gray-100 rounded-lg p-12 flex items-center justify-center">
            <div className="space-y-4 w-full max-w-xs">
              <Skeleton className="h-12 w-12 rounded-full mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
              <Skeleton className="h-9 w-32 mx-auto" />
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

const StatsCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => {
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

export default AdminDashboard;
