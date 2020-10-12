import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { ContactsList } from './contacts-list';
import { ContactDetails } from './contact-detail';

export const ContactsDashboard: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/contacts" exact component={ContactsList} />
        <Route path="/contacts/:id" component={ContactDetails} />
        <Redirect exact from="/" to="/contacts" />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
