import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import './app.scss';

import { ContactsList } from './contacts/contacts-list';
import { ContactDetails } from './contacts/contact-detail';

export const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/contacts" exact={true} component={ContactsList} />
          <Route path="/contacts/:id" exact={true} component={ContactDetails} />
          <Redirect exact from="/" to="/contacts" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
