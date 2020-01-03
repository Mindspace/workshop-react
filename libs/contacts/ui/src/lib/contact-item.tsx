import React from 'react';
import { IonAvatar, IonItem, IonLabel } from '@ionic/react';
import { Contact } from '@workshop/shared/api';

interface ListItemProps {
  person: Contact;
  isButton?: boolean;
}

export const ContactListItem: React.FC<ListItemProps> = ({ person }) => {
  const url = `/contacts/${person.id}`;
  return (
    <IonItem routerLink={url}>
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

export default ContactListItem;
