/**
 * DashboardLayout.tsx
 * This layout is the dashboard of the whole project which will further render multiple List Components.
 */
import React, { useContext, useEffect, useState } from 'react';
import Header from "@/components/header";
import Decider from '@/components/desider';
import styles from '@/components/layout/layout.module.css';

export default function DashboardLayout(page: React.ReactNode) {
console.log("props")

  return (
    <div className={styles.dashboardLayout}>
        <Header />
        <Decider>{page}</Decider> 
    </div>
  );
}
