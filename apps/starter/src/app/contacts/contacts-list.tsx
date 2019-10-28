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
  '--min-height': '20px',
  '--border-radius': '5px',
  display: 'inline-block',
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
  const [service] = useState<ContactsService>(new ContactsService());
  const [people, setPeople] = useState<Contact[]>([]);

  const searchByName = React.createRef<HTMLIonInputElement>();
  const onSearchByName = e => {
    const request$ = service.searchBy(e.target.value);
    request$.subscribe(list => setPeople(list));
  };

  useIonViewWillEnter(() => {
    const allContacts$ = service.getContacts();
    allContacts$.subscribe(list => setPeople(list));
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
              onIonChange={onSearchByName}
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
