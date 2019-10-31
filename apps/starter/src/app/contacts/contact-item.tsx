import React from 'react';
import { IonAvatar, IonItem, IonLabel } from '@ionic/react';

import { Contact } from '../+state/contacts.model';

interface ListItemProps {
  person: Contact;
  isButton?: boolean;
}

export const ContactListItem: React.FC<ListItemProps> = ({ person, isButton = true }) => {
  const url = `/contacts/${person.id}`;
  return (
    <IonItem routerLink={isButton ? url : null}>
      <IonAvatar slot="start">
        <img src={person.photo} />
      </IonAvatar>
      <IonLabel>
        <h2>{person.name}</h2>
        <p>{person.position}</p>
      </IonLabel>
    </IonItem>
  );
};
