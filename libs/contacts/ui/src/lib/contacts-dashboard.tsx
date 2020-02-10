import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { ContactsService, ContactsContext } from '@workshop/contacts/data-access';

import { ContactsList } from './contacts-list';
import { ContactDetails } from './contact-detail';

export const ContactsDashboard: React.FC = () => {
  return (
    <ContactsContext.Provider value={new ContactsService()}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/contacts" exact={true} component={ContactsList} />
          <Route path="/contacts/:id" exact={true} component={ContactDetails} />
          <Redirect exact from="/" to="/contacts" />
        </IonRouterOutlet>
      </IonReactRouter>
    </ContactsContext.Provider>
  );
};
