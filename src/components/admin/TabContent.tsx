
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { UsersTab } from './tabs/UsersTab';
import { ConfessionsTab } from './tabs/ConfessionsTab';
import { ReportsTab } from './tabs/ReportsTab';
import { SettingsTab } from './tabs/SettingsTab';

export const TabContent = () => {
  return (
    <>
      <TabsContent value="users" className="space-y-4">
        <UsersTab />
      </TabsContent>
      
      <TabsContent value="confessions" className="space-y-4">
        <ConfessionsTab />
      </TabsContent>
      
      <TabsContent value="reports" className="space-y-4">
        <ReportsTab />
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-4">
        <SettingsTab />
      </TabsContent>
    </>
  );
};
