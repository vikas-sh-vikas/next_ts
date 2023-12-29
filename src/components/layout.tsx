/**
 * DashboardLayout.tsx
 * This layout is the dashboard of the whole project which will further render multiple List Components.
 */
import React, { useContext, useEffect, useState } from 'react';
import Header from "@/components/header";
import Decider from './desider';

export default function DashboardLayout(page: React.ReactNode) {


  return (
    <div>
        <Header />
      <Decider>{page}</Decider> 
  
    </div>
  );
}
