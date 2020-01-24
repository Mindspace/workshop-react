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
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

import { ContactsService, injector, Contact } from '@workshop/contacts/data-access';
import { ContactListItem } from './contact-item';

export const ContactsList: React.FC = () => {
  const [service] = useState<ContactsService>(injector.get(ContactsService));
  const [emitter] = useState<Subject<string>>(new Subject<string>());
  const [people, setPeople] = useState<Contact[]>([]);
  const doSearch = (e: CustomEvent<InputChangeEventDetail>) => {
    const criteria = e.detail.value;
    emitter.next(criteria);
  };

  useEffect(() => {
    const term$ = emitter.asObservable();
    const allContacts$ = service.getContacts().pipe(takeUntil(term$));
    const searchTerm$ = term$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((criteria) => service.searchBy(criteria))
    );
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
