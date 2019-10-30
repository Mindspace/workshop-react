import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  IonPage,
  useIonViewWillEnter,
  IonFooter,
  IonButton,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonLabel
} from '@ionic/react';

import { Contact, ContactsService } from '../+state';

import './contact-details.scss';

const gridItem = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
} as React.CSSProperties;

export interface ContactDetailPage extends RouteComponentProps<{ id: string }> {}

export const ContactDetails: React.FC<ContactDetailPage> = ({ match }) => {
  const [service] = useState<ContactsService>(new ContactsService());
  const [contact, setContact] = useState<Contact>({} as Contact);

  useIonViewWillEnter(() => {
    // Use Router param `id` to lookup
    const request$ = new ContactsService().getContactById(match.params.id);
    request$.subscribe(who => setContact(who));
  });

  return (
    <IonPage style={gridItem} className="contactDetails">
      <IonCard>
        <IonCardContent>
          <IonAvatar slot="start">
            <img src={contact.photo} />
          </IonAvatar>
          <IonLabel>
            <h2>{contact.name}</h2>
            <p>{contact.position}</p>
          </IonLabel>
        </IonCardContent>
        <IonFooter>
          <IonButton routerLink="/contacts">Back</IonButton>
        </IonFooter>
      </IonCard>
    </IonPage>
  );
};
