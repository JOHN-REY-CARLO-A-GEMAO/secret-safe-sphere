
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export const ConfessionsTab = () => {
  return (
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
  );
};
