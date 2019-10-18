import React from 'react';
import { IonApp, IonContent } from '@ionic/react';

import './app.scss';
import { ContactsService } from './services/contacts.service';

// @ts-ignore
const contacts = new ContactsService().getContacts();

export const App = () => {
  return (
    <IonApp>
      <IonContent>
        <div className="splash">
          <img src="assets/react-master-class.png" width="50%" alt=""></img>
        </div>
      </IonContent>
    </IonApp>
  );
};
