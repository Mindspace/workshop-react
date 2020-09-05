import './contact-detail.scss';
import { gridItem } from './styles';

import Mousetrap from 'mousetrap';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Redirect, useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import { IonPage, IonFooter, IonButton, IonCard, IonCardContent, IonAvatar, IonLabel } from '@ionic/react';
import { Contact, ContactsService } from '@workshop/contacts/data-access';

export interface ContactDetailProps extends RouteComponentProps<{ id: string }> {}

export const ContactDetails: React.FC<ContactDetailProps> = ({ match }) => {
  const [contact, setContact] = useState<Contact>({} as Contact);
  const history = useHistory();
  const { id } = useParams();

  // Use Router param `id` to lookup
  useEffect(() => {
    const service = new ContactsService();
    const request = service.getContactById(id);

    request.then(who => setContact(who));
  }, [id]);

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
