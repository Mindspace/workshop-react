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
import { search } from 'ionicons/icons';

import { inlineItem, iconOnLeft, stickyRight } from './styles';

import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContactsService, injector, Contact } from '@workshop/contacts/data-access';
import { ContactListItem } from './contact-item';

export const ContactsList: React.FC = () => {
  const [service] = useState<ContactsService>(injector.get(ContactsService));
  const [emitter] = useState<Subject<string>>(new Subject<string>());
  const [people, setPeople] = useState<Contact[]>([]);
  const [criteria, setCriteria] = useState<string>('');
  const doSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    const criteria = e.detail.value;
    setCriteria(criteria);
    emitter.next(criteria);
  };

  useEffect(() => {
    const term$ = emitter.asObservable();
    const allContacts$ = service.getContacts().pipe(takeUntil(term$));
    const searchTerm$ = service.autoSearch(term$);
    const watch = merge(allContacts$, searchTerm$).subscribe(setPeople);

    return () => watch.unsubscribe();
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
