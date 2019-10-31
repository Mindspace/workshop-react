import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonItem,
  IonIcon,
  IonInput,
  useIonViewDidEnter
} from '@ionic/react';

import { Contact } from '../+state/contacts.model';
import { ContactsService } from '../+state/contacts.service';
import { ContactListItem } from './contact-item';
import { Observable, Subscriber } from 'rxjs';

const inlineItem = {
  display: 'inline-block',
  '--min-height': '20px',
  paddingLeft: '10px'
} as React.CSSProperties;

const stickyRight = {
  position: 'absolute',
  right: '10px',
  top: '12px'
} as React.CSSProperties;

const iconOnLeft = {
  '--padding-start': '5px'
};

export const ContactsList: React.FC = () => {
  const service = new ContactsService();
  const searchByName = React.createRef<HTMLIonInputElement>();
  const [people, setPeople] = useState<Contact[]>([]);

  useIonViewWillEnter(() => {
    const request$ = service.getContacts();
    request$.subscribe(list => setPeople(list));
  });

  useIonViewDidEnter(() => {
    searchByName.current.setFocus();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem style={inlineItem}>
            <IonIcon name="search"></IonIcon>
            <IonInput
              clearInput
              autofocus
              style={iconOnLeft}
              ref={searchByName}
              placeholder="Search by name..."
            ></IonInput>
          </IonItem>
          <IonTitle style={stickyRight}> Employees </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {people.map((person, idx) => {
            return <ContactListItem key={idx} person={person} />;
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
