import React from 'react';
import { IonApp } from '@ionic/react';

import { ContactsDashboard } from '@workshop/contacts/ui';

import './app.scss';

export const App = () => {
  return (
    <IonApp>
      <ContactsDashboard></ContactsDashboard>
    </IonApp>
  );
};
