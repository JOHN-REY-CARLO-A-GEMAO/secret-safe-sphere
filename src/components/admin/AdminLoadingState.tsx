
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const AdminLoadingState = () => {
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
