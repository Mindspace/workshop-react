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

import { useObservable } from '@mindspace-io/react';
import { InputChangeEventDetail } from '@ionic/core';

import { search } from 'ionicons/icons';
import { inlineItem, iconOnLeft, stickyRight } from './styles';

import { injector, Contact, ContactsFacade } from '@workshop/contacts/data-access';
import { ContactListItem } from './contact-item';

export const ContactsList: React.FC = () => {
  const facade: ContactsFacade = injector.get(ContactsFacade);
  const [criteria] = useObservable<string>(facade.criteria$, '');
  const [people] = useObservable<Contact[]>(facade.contacts$, []);
  const doSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    const criteria = e.detail.value;
    facade.searchFor(criteria);
  };

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
