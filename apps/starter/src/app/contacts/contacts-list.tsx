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

import { Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Contact } from '../+state/contacts.model';
import { ContactsService } from '../+state/contacts.service';
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
  const [watch, setWatch] = useState<Subscription>(null);
  const [people, setPeople] = useState<Contact[]>([]);

  const searchByName = React.createRef<HTMLIonInputElement>();
  const onSearchByName = e => {
    emitter.next(e.target.value);
  };

  useIonViewDidEnter(() => searchByName.current.setFocus());
  useIonViewWillLeave(() => watch.unsubscribe());
  useIonViewWillEnter(() => {
    const allContacts$ = service.getContacts();
    const searchTerm$ = emitter.asObservable().pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(term => service.searchBy(term))
    );

    setWatch(merge(allContacts$, searchTerm$).subscribe(list => setPeople(list)));
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
