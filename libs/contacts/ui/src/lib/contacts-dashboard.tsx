import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { ContactsList } from './contacts-list';
import { ContactDetails } from './contact-detail';

export const ContactsDashboard: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route path="/" exact component={ContactsList} />
          <Route path="/contacts" exact component={ContactsList} />
          <Route path="/contacts/:id" exact component={ContactDetails} />

          <Redirect from="*" to="/contacts" />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
