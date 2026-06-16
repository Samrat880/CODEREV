import {requireAuth} from "@/features/Auth/actions";
import React from 'react';

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {

    await requireAuth();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {children}
    </div>
  );
}
