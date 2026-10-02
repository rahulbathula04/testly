import React from 'react';
import Testly100CommandCenter from './testly100/Testly100CommandCenter';

export default function RealAdminPortal({
  onNavigateHome,
  adminUser = { name: 'Rahul Bathula', email: 'rahulbathula04@gmail.com', role: 'Super Admin' },
  onLogout
}) {
  return (
    <Testly100CommandCenter
      onNavigateHome={onNavigateHome}
      adminUser={adminUser}
      onLogout={onLogout}
      initialView="dashboard"
    />
  );
}
