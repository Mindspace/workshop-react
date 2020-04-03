import React from 'react';
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

import { search } from 'ionicons/icons';
import { inlineItem, iconOnLeft, stickyRight } from './styles';

import { useContacts } from '@workshop/contacts/data-access';
import { ContactListItem } from './contact-item';
import { InputChangeEventDetail } from '@ionic/core';

export const ContactsList: React.FC = () => {
  const [criteria, people, facade] = useContacts();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem style={inlineItem}>
            <IonIcon icon={search.md}></IonIcon>
            <IonInput
              clearInput
              autofocus
              value={criteria}
              style={iconOnLeft}
              onIonChange={(e: CustomEvent<InputChangeEventDetail>) => facade.searchFor(e.detail.value)}
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
