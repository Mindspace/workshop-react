import React from 'react';
import { RouteComponentProps, Redirect, useHistory } from 'react-router';
import { IonPage, IonFooter, IonButton, IonCard, IonCardContent, IonAvatar, IonLabel } from '@ionic/react';

import { useContactDetails, useMouseTrap } from '@workshop/contacts/data-access';
import './contact-detail.scss';
import { gridItem } from './styles';

export interface ContactDetailProps extends RouteComponentProps<{ id: string }> {}

export const ContactDetails: React.FC<ContactDetailProps> = () => {
  const [contact, navigate] = useContactDetails();
  const history = useHistory();

  // 'Esc' keyboard shortcut to close the popup
  useMouseTrap('esc', () => navigate.goBack(), [history.location]);

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
