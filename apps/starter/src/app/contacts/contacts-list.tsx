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
  useIonViewDidEnter,
  useIonViewWillLeave
} from '@ionic/react';

import { Subject, merge, Subscription, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Contact, ContactsService } from '../+state';
import { ContactListItem } from './contact-item';

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
  const [emitter] = useState<Subject<string>>(new Subject<string>());
  const [watches, setWatch] = useState<Subscription[]>([]);
  const [people, setPeople] = useState<Contact[]>([]);
  const [criteria, setCriteria] = useState<string>('');

  const searchByName = React.createRef<HTMLIonInputElement>();

  const onSearchByName = e => emitter.next(e.target.value);
  const addWatch = (source$: Observable<any>, next: (val: any) => void) => {
    const subscription = source$.subscribe(next);
    setWatch([subscription].concat(watches));
  };

  useIonViewWillLeave(() => watches.map(it => it.unsubscribe()));
  useIonViewDidEnter(() => searchByName.current.setFocus());
  useIonViewWillEnter(() => {
    const term$ = emitter.asObservable();
    const allContacts$ = service.getContacts().pipe(takeUntil(term$));
    const searchTerm$ = service.autoSearch(term$);

    addWatch(term$, term => setCriteria(term));
    addWatch(merge(allContacts$, searchTerm$), list => setPeople(list));
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
              value={criteria}
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
