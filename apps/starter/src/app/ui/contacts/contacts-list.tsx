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

import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { useObservable } from '@mindspace/core';

import { ContactListItem } from './contact-item';
import { ContactsFacade, Contact, injector } from '../../+state';

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
  const [facade] = useState<ContactsFacade>(injector.get(ContactsFacade));
  const [emitter] = useState<Subject<string>>(new Subject<string>());
  const [people, setPeople$] = useObservable<Contact[]>(null, []);
  const [criteria, setCriteria$] = useObservable<string>(null, '');
  const searchByName = React.createRef<HTMLIonInputElement>();
  const doSearch = e => emitter.next(e.target.value);

  useIonViewDidEnter(() => searchByName.current.setFocus());
  useIonViewWillEnter(() => {
    const term$ = emitter.asObservable();
    const allContacts$ = facade.contacts$.pipe(takeUntil(term$));
    const searchTerm$ = facade.autoSearch(term$);

    setCriteria$(term$);
    setPeople$(merge(allContacts$, searchTerm$));
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
              placeholder="Search by name..."
              style={iconOnLeft}
              ref={searchByName}
              value={criteria}
              onIonChange={doSearch}
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
