import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonIcon,
  IonInput,
} from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { search } from 'ionicons/icons';

import { inlineItem, iconOnLeft, stickyRight } from './styles';

import { ContactsService } from '@workshop/contacts/data-access';
import { ContactListItem } from './contact-item';

export const ContactsList: React.FC = () => {
  const [service] = useState(() => new ContactsService());
  const [people, setPeople] = useState([]);
  // const doSearch = (e: Event) => {
  //   const criteria = (e.target as HTMLIonInputElement).value as string;
  //   service.searchBy(criteria).then(setPeople);
  // };
  const doSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    const criteria = e.detail.value;
    service.searchBy(criteria).then(setPeople);
  };

  useEffect(() => {
    service.getContacts().then(setPeople);
  }, [service, setPeople]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem style={inlineItem}>
            <IonIcon icon={search.md}></IonIcon>
            <IonInput
              clearInput
              autofocus
              style={iconOnLeft}
              onIonChange={doSearch}
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
