/**
 * DashboardLayout.tsx
 * This layout is the dashboard of the whole project which will further render multiple List Components.
 */
import React, { useContext, useEffect, useState } from 'react';
import Header from "@/components/header/header";
import Decider from '@/components/decider/desider';

export default function DashboardLayout(page: React.ReactNode) {
console.log("props")

  return (
    <div >
        <Header />
        <Decider>{page}</Decider> 
    </div>
  );
}
