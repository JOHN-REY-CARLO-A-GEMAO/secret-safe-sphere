
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminStats } from '@/hooks/use-admin-stats';
import { AuthCheck } from '@/components/admin/AuthCheck';
import { StatsSection } from '@/components/admin/StatsSection';
import { TabContent } from '@/components/admin/TabContent';
import { AdminLoadingState } from '@/components/admin/AdminLoadingState';

const AdminDashboard = () => {
  const adminStats = useAdminStats();

  if (adminStats.isLoading) {
    return <AdminLoadingState />;
  }

  return (
    <AuthCheck>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 mt-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your Whisperspace community</p>
          </div>

          <StatsSection stats={adminStats} />

          <Tabs defaultValue="users">
            <TabsList className="mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="confessions">Confessions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabContent />
          </Tabs>
        </main>
        <Footer />
      </div>
    </AuthCheck>
  );
};

export default AdminDashboard;
