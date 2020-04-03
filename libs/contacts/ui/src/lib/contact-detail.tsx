import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Redirect, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import Mousetrap from 'mousetrap';
import { useObservable } from '@mindspace-io/react';

import { IonPage, IonFooter, IonButton, IonCard, IonCardContent, IonAvatar, IonLabel } from '@ionic/react';

import './contact-detail.scss';
import { gridItem } from './styles';

import { Contact, ContactsService, injector } from '@workshop/contacts/data-access';

export interface ContactDetailProps extends RouteComponentProps<{ id: string }> {}

export const ContactDetails: React.FC<ContactDetailProps> = () => {
  const [service] = useState<ContactsService>(injector.get(ContactsService));
  const [contact, setContact$] = useObservable<Contact>(null, {} as Contact);
  const { id } = useParams();
  const history = useHistory();

  // Use Router param `id` to lookup
  useEffect(() => {
    setContact$(service.getContactById(id));
  }, [id, service, setContact$]);

  // 'Esc' keyboard shortcut to close the popup
  useEffect(() => {
    const key = 'esc';
    Mousetrap.bind([key], () => history.goBack());
    return () => Mousetrap.unbind([key]);
  }, [history]);

  return contact ? (
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
  ) : (
    <Redirect to="/contacts" />
  );
};
