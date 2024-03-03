import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { buildInjector } from '@workshop/data-access';

import { ContactDetails } from './contact-details';
import { ContactsList } from './contact-list';

// Build global DI container
buildInjector();

export const ContactsDashboard: React.FC = () => {
  const location = useLocation();

  return (
    <div>
      <div className="fixed inset-y-0 w-[320px] border-r border-neutral-200">
        <ContactsList />
      </div>

      <main className="flex min-h-screen flex-col pl-[320px] ">
        <Routes key={location?.pathname} location={location}>
          <Route index element={<ContactDetails />} />
          <Route path=":id" element={<ContactDetails />} />
          <Route path="*" element={<h1>Invalid Route</h1>} />
        </Routes>
      </main>
    </div>
  );
};
