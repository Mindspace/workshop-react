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

import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { useObservable } from '@mindspace-io/react';

import { Contact, injector, ContactsService } from '@workshop/contacts/data-access';
import { ContactListItem } from './contact-item';

import { search } from 'ionicons/icons';
import { inlineItem, iconOnLeft, stickyRight } from './styles';

export const ContactsList: React.FC = () => {
  const [people, setPeople$] = useObservable<Contact[]>(null, []);
  const [criteria, setCriteria$] = useObservable<string>(null, '');
  const [emitter] = useState<Subject<string>>(new Subject<string>());
  const [service] = useState<ContactsService>(injector.get(ContactsService));
  const doSearch = (e: CustomEvent<InputChangeEventDetail>) => emitter.next(e.detail.value);

  useEffect(() => {
    const term$ = emitter.asObservable();
    const allContacts$ = service.getContacts().pipe(takeUntil(term$));
    const searchTerm$ = service.autoSearch(term$);

    setCriteria$(term$);
    setPeople$(merge(allContacts$, searchTerm$));
  }, [service, setPeople$, setCriteria$]);

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
